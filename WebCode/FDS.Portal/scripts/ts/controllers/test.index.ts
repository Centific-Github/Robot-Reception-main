import * as uirouter from "angular-ui-router";
import * as uib from "angular-ui-bootstrap";
import config from "../config";
import ng from "angular";
import BaseCtrl from "./base";
import enums from "../models/enums";

export class TestIndexCtrl extends BaseCtrl {

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
        scope.pageSize = 10;
        scope.pageChanged = this.pageChanged.bind(this);
        scope.showTestModel = this.showTestModel.bind(this);
        scope.importTest = this.importTest.bind(this);

        this.pageChanged();
    }

    // #region 分页
    async pageChanged(): Promise<void> {
        let scope: any = this.$scope;
        let query = scope.query;
        query.loading = true;
        try {
            let query = scope.query;
            let dataSource = [
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
                { name: "1111111111", text: "222222222222222" },
            ];

            await this.$timeout(() => {
                let list = {
                    data: dataSource.slice((scope.pageIndex - 1) * scope.pageSize, scope.pageIndex * scope.pageSize),
                    totalCount: 20
                };
                scope.list = list.data;
                scope.totalCount = list.totalCount;

                query.loading = false;
            }, 1000);
        } catch (err) {
            console.error(err);
            this.$notify.error("获取日志列表失败");
        }
        finally {
            query.loading = false;
        }
    }
    // #endregion 分页

    // #region showTestModel
    async showTestModel(): Promise<void> {
        this.$uibModal.open({
            templateUrl: "testTemplate.html",
            controller: ($scope, $uibModalInstance: uib.IModalInstanceService,
                $http: ng.IHttpService, $q: ng.IQService, $swal, $notify) => {

                $scope.test = {};

                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
                };

                $scope.ok = async () => {
                    try {

                        $notify.success("新增用户成功");
                        $uibModalInstance.close();

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

    // #region 上传测试
    async importTest(file): Promise<void> {
        debugger;
        if (!file) return;

        if (!this.validateFileSize(file, enums.fileSize.size500k.value)) return;

        let scope: any = this.$scope;

        try {
            scope.uploading = true;
            await this.$timeout(() => {
                scope.uploading = false;
            }, 2000);

            //let resp = await this.Upload.upload({
            //    method: "POST",
            //    url: "",
            //    data: { file: file },
            //});

            //if (resp.status === 200) {
            //    if (resp.data["errcode"] === 0) {
            //        this.$swal.success({ title: "导入DDI库存报表成功", text: resp.data["errmsg"] });
            //    } else {
            //        let desc = resp.data["errdescription"];
            //        if (desc) console.error(desc);
            //        this.$swal.warning({ title: "导入DDI库存报表失败", text: resp.data["errmsg"] });
            //    }
            //}
            //else {
            //    this.$notify.error("导入DDI库存报表异常, 请联系管理员");
            //}
        } catch (err) {
            console.error(err);
            this.$notify.error("error");
        } finally {
            scope.uploading = false;
        }
    }
    // #endregion
}