
import * as uirouter from "angular-ui-router";
import * as uib from "angular-ui-bootstrap";
import config from "../config";
import ng from "angular";
import BaseCtrl from "./base";
import enums from "../models/enums";
import * as webapi from "../services/api";
import _ from "lodash";
import { UserAddVM } from "../services/api";

export class AccountIndexCtrl extends BaseCtrl {

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

        scope.pageIndex = 1;
        scope.pageSize = 20;
        scope.pageChanged = this.pageChanged.bind(this);
        scope.showMemberModel = this.showMemberModel.bind(this);
        scope.openMemberModal = this.openMemberModal.bind(this);
        scope.deleteUser = this.deleteUser.bind(this);

        //绑定RoleList

        scope.rolelist = [
            { name: "admin", id: 0 },
            { name: "user", id: 1 },
        ];

        this.pageChanged();
    }
    // #region 删除
    async deleteUser(l): Promise<void> {
        await this.$swal.confirm({
            title: "Are you sure you want to delete this user?",
        });

        try {
            //
            let webUsersClient: webapi.WebUsersClient = this.api.getClient(webapi.WebUsersClient);
            let res = await webUsersClient.deleteUser(l.id);

            if (res.errcode === 0) {
                this.pageChanged();
                this.$notify.success("Delete the success!");
            } else {
                this.$swal.error({ title: "Delete failed!", text: res.errmsg });
            }
        } catch (err) {
            console.error(err);
            this.$swal.error({ title: "Delete the exception, please contact the administrator!" });
        }
    }
    // #endregion


    // #region 查询分页
    async pageChanged(): Promise<void> {
        let scope: any = this.$scope;
        let query = scope.query;
        query.loading = true;
        try {
            let query = scope.query;
            let webUsersClient: webapi.WebUsersClient = this.api.getClient(webapi.WebUsersClient);
            let dataSource = await webUsersClient.getUsers();
            scope.list = dataSource.data;
            query.loading = false;

        } catch (err) {
            console.error(err);
            this.$notify.error("Failed to get user list");
        }
        finally {
            query.loading = false;
        }
    }
    // #endregion 分页

    // #region showPositionModel
    async showMemberModel(): Promise<void> {
        this.$uibModal.open({
            templateUrl: "testTemplate.html",
            controller: async ($scope, $uibModalInstance: uib.IModalInstanceService,
                $http: ng.IHttpService, $q: ng.IQService, $swal, $notify) => {
                $scope.account = {};
                $scope.rolelist = [
                    { name: "admin", id: 0 },
                    { name: "user", id: 1 },
                ];
                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
                };

                $scope.ok = async () => {
                    try {

                        if ($scope.account.account === undefined) {
                            $swal.error({ title: "请填写account!" });
                            return;
                        }

                        if ($scope.account.role === undefined) {
                            $swal.error({ title: "请选择Role!" });
                            return;
                        }
                        
                        if ($scope.account.comments === undefined) {
                            $swal.error({ title: "请填写Comments!" });
                            return;
                        }


                        let webUsersClient: webapi.WebUsersClient = this.api.getClient(webapi.WebUsersClient);

                        let userAddVM: webapi.UserAddVM = this.api.getClient(webapi.UserAddVM);
                        userAddVM.account = $scope.account.account;
                        userAddVM.role = $scope.account.role.id;
                        userAddVM.comments = $scope.account.comments;
           
                        let resp = await webUsersClient.addUser(userAddVM);
                        if (resp.errcode === 0) {
                            this.pageChanged();
                            $notify.success("Save success");
                            $uibModalInstance.close();
                        }
                        else {
                            $swal.error({ title: resp.errmsg });
                            //$uibModalInstance.close();
                        }
                    } catch (err) {
                        console.error(err);
                        $swal.error({ title: "New exception, please contact the administrator!" });
                    }
                };
            },
            resolve: {
            },
            size: 'lg',
        }).result.then((data) => {

        }).catch(() => { });
    }
    // #endregion


    // #region openPositionModal
    async openMemberModal(l): Promise<void> {
        this.$uibModal.open({
            templateUrl: "memberTemplate.html",
            controller: async ($scope, $uibModalInstance: uib.IModalInstanceService,
                $http: ng.IHttpService, $q: ng.IQService, $swal, $notify) => {
                $scope.rolelist = [
                    { name: "admin", id: 0 },
                    { name: "user", id: 1 },
                ];
                $scope.account = {};
                $scope.account.id = l.id;
                $scope.account.account = l.account;
                $scope.account.role = _.find($scope.rolelist, (item) => item.id === l.role);
                $scope.account.comments = l.comments;
                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
                };

                $scope.ok = async () => {
                    try {
                        if ($scope.account.account === undefined) {
                            $swal.error({ title: "请填写account!" });
                            return;
                        }

                        if ($scope.account.role === undefined) {
                            $swal.error({ title: "请选择Role!" });
                            return;
                        }

                        if ($scope.account.comments === undefined) {
                            $swal.error({ title: "请填写Comments!" });
                            return;
                        }


                        let webUsersClient: webapi.WebUsersClient = this.api.getClient(webapi.WebUsersClient);

                        let userUpdateVM: webapi.UserUpdateVM = this.api.getClient(webapi.UserUpdateVM);
                        userUpdateVM.id = $scope.account.id;
                        userUpdateVM.account = $scope.account.account;
                        userUpdateVM.role = $scope.account.role.id;
                        userUpdateVM.comments = $scope.account.comments;

                        let resp = await webUsersClient.updateUser(userUpdateVM);
                        if (resp.errcode === 0) {
                            this.pageChanged();
                            this.$notify.success("update successful");
                            $uibModalInstance.close();
                        }
                        else {
                            $swal.error({ title: resp.errmsg });
                            $uibModalInstance.close();
                        }
                    } catch (err) {
                        console.error(err);
                        $swal.error({ title: "Update exception, please contact administrator!" });
                    }
                };
            },
            resolve: {
            },
            size: 'lg',
        }).result.then((data) => {

        }).catch(() => { });
    }
    // #endregion


}