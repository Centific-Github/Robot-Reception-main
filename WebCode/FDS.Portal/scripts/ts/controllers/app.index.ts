
import * as uirouter from "angular-ui-router";
import * as uib from "angular-ui-bootstrap";
import config from "../config";
import ng from "angular";
import BaseCtrl from "./base";
import enums from "../models/enums";
import * as webapi from "../services/api";
import _ from "lodash";

export class AppIndexCtrl extends BaseCtrl {

    constructor(
        private $scope: ng.IScope,
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private $swal: any,
        private $timeout: ng.ITimeoutService,
        private $state: uirouter.StateService,
        private $stateParams: uirouter.StateParams,
        private principal: any,
        private $rootScope: ng.IRootScopeService,
        private $uibModal: uib.IModalService,
        private $location: ng.ILocationService,
        private $urlService: uirouter.UrlService,
        private $notify: any,
        private $i18next: any,
        private api: any,
        private validateFileSize: any,
        private Upload: ng.angularFileUpload.IUploadService,
    ) {
        super($notify, $i18next, $scope);
        this.init();
    }

    async init(): Promise<void> {
        let scope: any = this.$scope;
        scope.query = {};
        scope.appAuth = {};
        scope.pageInit = this.pageInit.bind(this);
 
        this.pageInit();

        scope.close = () => {
            //this.$uibModalInstance.dismiss("dismiss");
        };

        scope.ok = async () => {
            try {

                if (scope.appAuth.authKey === undefined) {
                    this.$swal.error({ title: "请填写App Auth Key!" });
                    return;
                }

                if (scope.appAuth.psw === undefined) {
                    this.$swal.error({ title: "请填写App Update Password!" });
                    return;
                }

                let webAppAuthClient: webapi.WebAppAuthClient = this.api.getClient(webapi.WebAppAuthClient);

                let appAuthVM: webapi.AppAuthVM = this.api.getClient(webapi.AppAuthVM);

                appAuthVM.authKey = scope.appAuth.authKey;
                appAuthVM.psw = scope.appAuth.psw;

                let resp = await webAppAuthClient.upateAppAuth(appAuthVM);
                if (resp.errcode === 0) {
                    this.pageInit();
                    this.$notify.success("Update successful!");
                    //$uibModalInstance.close();
                }
                else {
                    this.$swal.error({ title: resp.errmsg });
                    //$uibModalInstance.close();
                }
            } catch (err) {
                console.error(err);
                this.$swal.error({ title: "Update exception, please contact administrator!" });
            }
        };

    }

    // #region 初始化数据
    async pageInit(): Promise<void> {
        let scope: any = this.$scope;
        let query = scope.query;
        let appAuth = scope.appAuth;
        query.loading = true;
        try {
            let query = scope.query;
            let webAppAuthClient: webapi.WebAppAuthClient = this.api.getClient(webapi.WebAppAuthClient);
            let dataSource = await webAppAuthClient.getAppAuth();
            appAuth.authKey = dataSource.data.authKey;
            appAuth.psw = dataSource.data.psw;
            query.loading = false;

        } catch (err) {
            console.error(err);
            this.$notify.error("Failed initialization");
        }
        finally {
            query.loading = false;
        }
    }
    // #endregion 分页

}