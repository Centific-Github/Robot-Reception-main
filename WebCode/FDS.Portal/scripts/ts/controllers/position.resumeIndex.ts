
import * as uirouter from "angular-ui-router";
import * as uib from "angular-ui-bootstrap";
import config from "../config";
import ng from "angular";
import BaseCtrl from "./base";
import enums from "../models/enums";
import * as webapi from "../services/api";
import moment from "moment";

export class ResumeIndexCtrl extends BaseCtrl {
    private id: number;
    private fileName: string;
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


        this.id = this.$stateParams["id"];

        if (this.id === null) {
            this.$state.go("position.index");
            this.$notify.info("会员信息丢失，请重新选择会员");
            return;
        }
        scope.id = this.id;
        this.fileName = this.$stateParams["fileName"];
        scope.pageIndex = 1;
        scope.pageSize = 20;
        scope.pageChanged = this.pageChanged.bind(this);
        scope.showRecordModel = this.showRecordModel.bind(this);
        scope.openRecordModal = this.openRecordModal.bind(this);
        this.pageChanged();


        // 导出日志
        scope.export = async ($filter) => {
            //根据ID获取与职位相关的投递信息
            let recordsClient: webapi.RecordsClient = this.api.getClient(webapi.RecordsClient);
            let resp = await recordsClient.export(this.id);
            let blob = new Blob([resp.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            let today = moment().format('l');
            let fileName = this.fileName + "_" + today;
            this.downLoad(blob, fileName);
        };
    }


    async downLoad(blob, fileName): Promise<void> {
        if (window.navigator.msSaveOrOpenBlob) { // For IE:
            navigator.msSaveBlob(blob, fileName + ".xlsx");
        } else { // For other browsers:
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            window.URL.revokeObjectURL(link.href);
        }
    }

    // #region 查询分页
    async pageChanged(): Promise<void> {
        let scope: any = this.$scope;
        let query = scope.query;
        query.loading = true;
        try {
            let query = scope.query;

            //根据会员ID获取消费记录
            let membersClient: webapi.MembersClient = this.api.getClient(webapi.MembersClient);
            let member = await membersClient.getMember(scope.id);

            query.name = member.data.name;
            query.phone = member.data.phone;
            query.totalmoney = member.data.money;
            query.whiteSpirittotalmoney = member.data.whiteSpiritMoney;   
            query.cashTotalMoney = member.data.cashMoney;

            //根据会员ID获取消费记录
            let recordsClient: webapi.RecordsClient = this.api.getClient(webapi.RecordsClient);
            let dataSource = await recordsClient.getRecordList(scope.pageIndex, scope.pageSize, scope.id);


            scope.list = dataSource.data.list;
            scope.totalCount = dataSource.data.totalCount;
            query.loading = false;

        } catch (err) {
            console.error(err);
            this.$notify.error("获取消费记录失败");
        }
        finally {
            query.loading = false;
        }
    }
    // #endregion 分页


    // #region openPositionModal
    async openRecordModal(l): Promise<void> {
        this.$uibModal.open({
            templateUrl: "opRecordTemplate.html",
            controller: ($scope, $uibModalInstance: uib.IModalInstanceService,
                $http: ng.IHttpService, $q: ng.IQService, $swal, $notify) => {
                $scope.name = l.name;
                $scope.phone = l.phone;
                $scope.createDate = l.createDate;
                $scope.money = l.money;
                $scope.types = l.types;
                $scope.description = l.description;
                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
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
    async showRecordModel(): Promise<void> {
        this.$uibModal.open({
            templateUrl: "recordTemplate.html",
            controller: async ($scope, $uibModalInstance: uib.IModalInstanceService,
                $http: ng.IHttpService, $q: ng.IQService, $swal, $notify) => {

                $scope.record = {};

                $scope.id = this.id;


               //获取行业类别和职业类别
                let dictionariesClient: webapi.DictionariesClient = this.api.getClient(webapi.DictionariesClient);
                let datatypeSource = await dictionariesClient.getDictionariesTypeAll(0, 1);
              
                $scope.typeList = datatypeSource.data.industrytypeList;


                //根据会员ID获取消费记录
                let membersClient: webapi.MembersClient = this.api.getClient(webapi.MembersClient);
                let member = await membersClient.getMember($scope.id);

                $scope.record.name = member.data.name;
                $scope.record.phone = member.data.phone;
                $scope.record.totalmoney = member.data.money;
                $scope.record.whiteSpirittotalmoney = member.data.whiteSpiritMoney;  

                $scope.record.cashTotalMoney = member.data.cashMoney;
                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
                };

                $scope.ok = async () => {
                    try {
                        if ($scope.record.type===undefined) {
                            $swal.error({ title: "请选择消费类别" });
                            return;
                        }
                        if ($scope.record.money === undefined) {
                            $swal.error({ title: "请填写消费金额!" });
                            return;
                        }

                        if ($scope.record.money <= 0) {
                            $swal.error({ title: "消费金额不能小于0元!" });
                            return;
                        }

                        let ltype=$scope.record.type.id;
                        if (ltype===1)
                        {
                            if ($scope.record.totalmoney < $scope.record.money) {
                                $swal.error({ title: "消费金额超出啤酒系统余额，请先预存金额再消费!" });
                                return;
                            }
                        }
                        else if (ltype===2)
                        {
                            if ($scope.record.whiteSpirittotalmoney < $scope.record.money) {
                                $swal.error({ title: "消费金额超出白酒系统余额，请先预存金额再消费!" });
                                return;
                            }
                        }
                         else if (ltype===3)
                        {
                            if ($scope.record.cashTotalMoney < $scope.record.money) {
                                $swal.error({ title: "消费金额超出现金系统余额，请先预存金额再消费!" });
                                return;
                            }
                        }
                    


                        let money = $scope.record.money;
                        let remark = $scope.record.description;

                      
                        let recordsClient: webapi.RecordsClient = this.api.getClient(webapi.RecordsClient);
                        let resp = await recordsClient.putInsertRecords(this.id, money, remark, ltype);
                        if (resp.errcode === 0) {
                            this.pageChanged();
                            $notify.success("新增消费记录成功");
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
}