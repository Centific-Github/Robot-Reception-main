import * as uirouter from "angular-ui-router";
import * as uib from "angular-ui-bootstrap";
import config from "../config";
import ng from "angular";
import BaseCtrl from "./base";
import enums from "../models/enums";
import * as webapi from "../services/api";
import _ from "lodash";
export class SysDictionaryCtrl extends BaseCtrl {

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
        scope.showDictionaryModel = this.showDictionaryModel.bind(this);
        scope.openDictionaryModel = this.openDictionaryModel.bind(this);

        let typelist = [
            { id: "1", name: "行业类别" },
            { id: "2", name: "职位类别" },
        ]

        scope.typelist = typelist;

        this.pageChanged();
    }


    // #region 分页
    async pageChanged(): Promise<void> {
        let scope: any = this.$scope;
        let query = scope.query;
        query.loading = true;
        try {
            let query = scope.query;

            let dictionariesClient: webapi.DictionariesClient = this.api.getClient(webapi.DictionariesClient);
            let dataSource = await dictionariesClient.getDictionarieAll(scope.pageIndex, scope.pageSize, scope.gatetory);
            scope.list = dataSource.data.list;
            scope.totalCount = dataSource.data.totalCount;

        } catch (err) {
            console.error(err);
            this.$notify.error("获取字典列表失败");
        }
        finally {
            query.loading = false;
        }
    }
    // #endregion 分页

    // #region showDictionaryModel
    async showDictionaryModel(): Promise<void> {
        this.$uibModal.open({
            templateUrl: "dictionaryTemplate.html",
            controller: ($scope, $uibModalInstance: uib.IModalInstanceService,
                $http: ng.IHttpService, $q: ng.IQService, $swal, $notify) => {


                let typelist = [
                    { id: "1", name: "行业类别" },
                    { id: "2", name: "职位类别" },
                ]

                $scope.typelist = typelist;

                $scope.dictionary = {};

                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
                };

                $scope.ok = async () => {
                    try {
                        if ($scope.dictionary.type === undefined) {
                            $swal.error({ title: "请选择类别!" });
                            return;
                        }

                        if ($scope.dictionary.value === undefined) {
                            $swal.error({ title: "请填写值!" });
                            return;
                        }

                        if ($scope.dictionary.description === undefined) {
                            $swal.error({ title: "请填写描述!" });
                            return;
                        }

                        let category = $scope.dictionary.type.id;
                        let name = $scope.dictionary.type.name;
                        let value = $scope.dictionary.value;
                        let description = $scope.dictionary.description;
                        let DictionariesClient: webapi.DictionariesClient = this.api.getClient(webapi.DictionariesClient);
                        let resp = await DictionariesClient.putDictionarys(category, name, value, description);
                        if (resp.errcode === 0) {
                            this.$notify.success("字典新增成功");
                            $uibModalInstance.close();
                        }
                        else {
                            $swal.error({ title: "新增异常,请联系管理员!" });
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


    // #region openDictionaryModel
    async openDictionaryModel(l): Promise<void> {
        this.$uibModal.open({
            templateUrl: "dictionaryEditTemplate.html",
            controller: ($scope, $uibModalInstance: uib.IModalInstanceService,
                $http: ng.IHttpService, $q: ng.IQService, $swal, $notify) => {

                let typelist = [
                    { id: "1", name: "行业类别" },
                    { id: "2", name: "职位类别" },
                    { id: "3", name: "新闻类别" },
                ]

                $scope.typelist = typelist;
                $scope.dictionary = {};

                $scope.dictionary.id = l.id;
                $scope.dictionary.type = _.find($scope.typelist, (item) => item.id === l.category);
                $scope.dictionary.value = l.value;
                $scope.dictionary.description = l.description;


                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
                };

                $scope.ok = async () => {
                    try {

                        if ($scope.dictionary.type === undefined) {
                            $swal.error({ title: "请选择类别!" });
                            return;
                        }

                        if ($scope.dictionary.value === undefined) {
                            $swal.error({ title: "请填写值!" });
                            return;
                        }

                        if ($scope.dictionary.description === undefined) {
                            $swal.error({ title: "请填写描述!" });
                            return;
                        }
                        let category = $scope.dictionary.type.id;
                        let name = $scope.dictionary.type.name;
                        let value = $scope.dictionary.value;
                        let description = $scope.dictionary.description;
                        let DictionariesClient: webapi.DictionariesClient = this.api.getClient(webapi.DictionariesClient);
                        let resp = await DictionariesClient.updateDictionarys($scope.dictionary.id, category, name, value, description);
                        if (resp.errcode === 0) {
                            this.$notify.success("字典更新成功");
                            $uibModalInstance.close();
                        }
                        else {
                            $swal.error({ title: "更新异常,请联系管理员!" });
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
}