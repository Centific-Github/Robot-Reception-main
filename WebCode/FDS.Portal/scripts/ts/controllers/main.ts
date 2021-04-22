import angular from "angular";
import * as uirouter from "angular-ui-router";
import * as uib from "angular-ui-bootstrap";
import config from "../config";
import ng from "angular";
import BaseCtrl from "./base";
import * as webapi from "../services/api";
import _ from "lodash";

export class MainCtrl extends BaseCtrl {
    private canNotification: boolean;
    constructor(
        private $scope: ng.IScope,
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private $swal: any,
        private $timeout: ng.ITimeoutService,
        private $state: uirouter.StateService,
        private principal: any,
        private $rootScope: ng.IRootScopeService,
        private $uibModal: uib.IModalService,
        private $location: ng.ILocationService,
        private $urlService: uirouter.UrlService,
        private $i18next: any,
        private $notify: any,
        private api: any,
        private desktopNotification: any,
        private $interval: ng.IIntervalService
    ) {
        super($notify, $i18next, $scope)
        this.init();
    }

    async init(): Promise<void> {
        try {
            let scope: any = this.$scope;
            scope.entity = {};

            scope.logout = this.logout.bind(this);
            scope.login = this.login.bind(this);

            scope.switchLanguage = this.switchLanguage.bind(this);

            //await this.$timeout(1000);

            //this.$cookies.put(100221, "asdssds");

            //let cookies=this.$cookies.getAll();


            scope.$on("zgh.setprincipal", async (event) => {
                this.principal.setInit();
                scope.isInited = this.principal.isInited();
                scope.$digest();
                //this.redirect();
            });

            this.principal.setInit();
            scope.isInited = this.principal.isInited();
            //scope.$digest();

            //this.loginSso("asf");

            if (location.href.indexOf("isCasIframe=1") != -1) {
                return;
            }

            let url = window.location.href;
            if (!(url.indexOf("/?ticket=") != -1)) {
                this.toAuth();
                return
            }
            let reg = new RegExp("(^|&)ticket=([^&]*)(&|$)", "i");
            let r = location.search.substr(1).match(reg);
            if (r != null) {
                scope.ticket = unescape(r[2]).toString();
                this.loginSso(scope.ticket);
            }
            else {
                this.toAuth();
                return
            }
        }
        catch (err) {
            console.error(err);
        }
    }


    async toAuth() {
        location.href = `${config.casLoginUrl}?service=${config.sysDomain}`;
    }


    async logout() {
        this.principal.logout();
        location.href = `${config.casServerUrl}/logout?service=${config.sysDomain}`;
        //window.location.reload();
    }

    async loginSso(ticket): Promise<void> {
        let scope: any = this.$scope;
        let entity = scope.entity;
        let userTiketVM = scope.userTiketVM;
        entity.isLoading = true;
        try {

            let webUsersClient: webapi.WebUsersClient = this.api.getClient(webapi.WebUsersClient);
            let userTiketVM: webapi.UserTiketVM = this.api.getClient(webapi.UserTiketVM);
            userTiketVM.serviceTicket = ticket;
            userTiketVM.serviceUrl = config.sysDomain;
            let user = await webUsersClient.loginSso(userTiketVM);
            if (user) {
                this.principal.setIdentity(user);
                this.$state.go("account.index");
                scope.isLogin = true;
            }
            else {
                this.logout();
            }

        } catch (err) {
            this.processErrorResponse(err);
        } finally {
            entity.isLoading = false;
        }
    }

    async getTicket(): Promise<string>{
        var reg = new RegExp("(^|&)ticket=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]).toString();
        return null; 
    }


    async login(): Promise<void> {
        let scope: any = this.$scope;
        let entity = scope.entity;
        entity.isLoading = true;
        try {
            let client: webapi.WebUsersClient = this.api.getClient(webapi.WebUsersClient);
            let user = await client.login(entity.userName, entity.password);
            this.principal.setIdentity(user);

            this.$state.go("account.index");
            scope.isLogin = true;
        } catch (err) {
            this.processErrorResponse(err);
        } finally {
            entity.isLoading = false;
        }
    }

    async switchLanguage(): Promise<void> {
        console.log(this.$i18next);
        let lng = this.$i18next.i18n.language;
        if (lng == "zh-CN") {
            lng = "en";
        } else {
            lng = "zh-CN";
        }
        this.$i18next.changeLanguage(lng);
    }


    async desktopNotificationCheck(): Promise<boolean> {
        var promise = new Promise<boolean>((resolve, reject) => {
            if (!this.desktopNotification.isSupported()) {
                this.$notify.warn("当前浏览器不支持桌面提醒功能");
                resolve(false);
            } else {
                if (this.desktopNotification.currentPermission() == "default") {
                    this.desktopNotification.requestPermission().then((permission) => {
                        this.$notify.success("成功启用桌面提醒功能");
                        resolve(true);
                    }, (permission) => {
                        this.$notify.warn("您禁用了桌面提醒功能,将不能及时的获得报警等提醒");
                        resolve(false);
                    });
                }
            }
        });

        return promise;
    }
}