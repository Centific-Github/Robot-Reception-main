
import * as uirouter from "angular-ui-router";
import * as uib from "angular-ui-bootstrap";
import config from "../config";
import ng from "angular";
import BaseCtrl from "./base";
import enums from "../models/enums";
import * as webapi from "../services/api";
import _ from "lodash";

export class VisitreasonIndexCtrl extends BaseCtrl {

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
        scope.openReasonModal = this.openReasonModal.bind(this);
        scope.openMemberModal = this.openMemberModal.bind(this);
        scope.deleteReason = this.deleteReason.bind(this);

        this.pageChanged();
    }

    // #region 查询分页
    async pageChanged(): Promise<void> {
        let scope: any = this.$scope;
        let query = scope.query;
        query.loading = true;
        try {
            let query = scope.query;
            let webVisitReasonClient: webapi.WebVisitReasonClient = this.api.getClient(webapi.WebVisitReasonClient);
            let dataSource = await webVisitReasonClient.getAll();
            scope.list = dataSource.data;
          
            query.loading = false;

        } catch (err) {
            console.error(err);
            this.$notify.error("Failed to get list");
        }
        finally {
            query.loading = false;
        }
    }
    // #endregion 分页

    // #region showPositionModel
    async openReasonModal(): Promise<void> {
        this.$uibModal.open({
            templateUrl: "testTemplate.html",
            controller: async ($scope, $uibModalInstance: uib.IModalInstanceService,
                $http: ng.IHttpService, $q: ng.IQService, $swal, $notify) => {

                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
                };

                $scope.ok = async () => {
                    try {

                        if ($scope.reason.visitReason === undefined) {
                            $swal.error({ title: "请填写reason!" });
                            return;
                        }

                        let webVisitReasonClient: webapi.WebVisitReasonClient = this.api.getClient(webapi.WebVisitReasonClient);
                        let resp = await webVisitReasonClient.addReason($scope.reason.visitReason);
                        
                        if (resp.errcode === 0) {
                            this.pageChanged();
                            $notify.success("新增Reason成功");
                            $uibModalInstance.close();
                        }
                        else {
                            $swal.error({ title: resp.errmsg });
                            $uibModalInstance.close();
                        }
                    } catch (err) {
                        console.error(err);
                        $swal.error({ title: "新增异常,请联系管理员!" });
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

                $scope.reason = {};
                $scope.reason.visitReason = l.visitReason;
                $scope.reason.id = l.id;
               
                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
                };

                $scope.ok = async () => {
                    try {
                        if ($scope.reason.visitReason === undefined) {
                            $swal.error({ title: "请填写reason!" });
                            return;
                        }
                     
         
                        let webVisitReasonClient: webapi.WebVisitReasonClient = this.api.getClient(webapi.WebVisitReasonClient);
                        let visitReasonInfo: webapi.VisitReasonInfo = this.api.getClient(webapi.VisitReasonInfo);
                        visitReasonInfo.id = $scope.reason.id;
                        visitReasonInfo.visitReason = $scope.reason.visitReason;
                        let resp = await webVisitReasonClient.editReason(visitReasonInfo);
                        if (resp.errcode === 0) {
                            this.pageChanged();
                            this.$notify.success("更新成功");
                            $uibModalInstance.close();
                        }
                        else {
                            $swal.error({ title: resp.errmsg });
                            $uibModalInstance.close();
                        }
                    } catch (err) {
                        console.error(err);
                        $swal.error({ title: "更新异常,请联系管理员!" });
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


    // #region 删除
    async deleteReason(l): Promise<void> {
        await this.$swal.confirm({
            title: "Are you sure you want to delete this reason?",
        });

        try {
            //
            let webVisitReasonClient: webapi.WebVisitReasonClient = this.api.getClient(webapi.WebVisitReasonClient);
            let res = await webVisitReasonClient.deleteReason(l.id);

            if (res.errcode === 0) {
                this.pageChanged();
                this.$notify.success("Delete success!");
            } else {
                this.$swal.error({ title: "Delete failed", text: res.errmsg });
            }
        } catch (err) {
            console.error(err);
            this.$swal.error({ title: "Delete the exception, please contact the administrator" });
        }
    }
    // #endregion


}