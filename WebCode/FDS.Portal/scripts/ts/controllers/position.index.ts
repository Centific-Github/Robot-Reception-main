
import * as uirouter from "angular-ui-router";
import * as uib from "angular-ui-bootstrap";
import config from "../config";
import ng from "angular";
import BaseCtrl from "./base";
import enums from "../models/enums";
import * as webapi from "../services/api";
import _ from "lodash";

export class PositionIndexCtrl extends BaseCtrl {

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

        //获取行业类别和职业类别
        let dictionariesClient: webapi.DictionariesClient = this.api.getClient(webapi.DictionariesClient);
        let datatypeSource = await dictionariesClient.getDictionariesTypeAll(0, 1);
        scope.industrytypeList = datatypeSource.data.industrytypeList;


        this.pageChanged();
    }

    // #region 查询分页
    async pageChanged(): Promise<void> {
        let scope: any = this.$scope;
        let query = scope.query;
        query.loading = true;
        try {
            let query = scope.query;
            let membersClient: webapi.MembersClient = this.api.getClient(webapi.MembersClient);
            let dataSource = await membersClient.getMembersAll(scope.pageIndex, scope.pageSize, query.name, query.phone);
            scope.list = dataSource.data.list;
            scope.totalCount = dataSource.data.totalCount;
           
            query.loading = false;

        } catch (err) {
            console.error(err);
            this.$notify.error("获取会员列表失败");
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
                $scope.member = {};
                //获取行业类别和职业类别
                //let dictionariesClient: webapi.DictionariesClient = this.api.getClient(webapi.DictionariesClient);
                //let datatypeSource = await dictionariesClient.getDictionariesTypeAll(0, 1);
                //$scope.industrytypeList = datatypeSource.data.industrytypeList;
                //$scope.typeList = datatypeSource.data.industrytypeList;
                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
                };

                $scope.ok = async () => {
                    try {

                        if ($scope.member.name === undefined) {
                            $swal.error({ title: "请填写会员名称!" });
                            return;
                        }

                        if ($scope.member.phone === undefined) {
                            $swal.error({ title: "请填写手机号!" });
                            return;
                        }
                        if ($scope.member.money === undefined) {
                            $swal.error({ title: "请填写啤酒预存金额!" });
                            return;
                        }
                        if ($scope.member.number === undefined) {
                            $swal.error({ title: "请填写啤酒预存数量!" });
                            return;
                        }

                        if ($scope.member.whiteSpiritMoney === undefined) {
                            $swal.error({ title: "请填写白酒预存金额!" });
                            return;
                        }
                        if ($scope.member.whiteSpiritNumber === undefined) {
                            $swal.error({ title: "请填写白酒预存数量!" });
                            return;
                        } 
                        if ($scope.member.cashMoney === undefined) {
                            $swal.error({ title: "请填写现金金额!" });
                            return;
                        }

                        //if ($scope.member.type === undefined) {
                            //$swal.error({ title: "请填写存酒类别!" });
                            //return;
                        //}


                        let membersClient: webapi.MembersClient = this.api.getClient(webapi.MembersClient);

                        let re = await membersClient.getMembersAll(1, 20, "", $scope.member.phone);
                        if (re.errcode === 0) {
                            if (re.data.list.length > 0) {
                                $swal.error({ title: "会员信息已经存在，请更换手机号!" });
                                return;
                            }
                        }
                        else {
                            $swal.error({ title: "根据手机号判断会员是否存在异常,请联系管理员!" });
                            $uibModalInstance.close();
                            return;
                        }
                        //根据手机号判断会员是否已经存在


                        let name = $scope.member.name;
                        let phone = $scope.member.phone;
                        let money = $scope.member.money;
                        let number = $scope.member.number;
                        //let type = $scope.member.type.id;
                        let remark = $scope.member.remark;
                        let whiteSpiritMoney=$scope.member.whiteSpiritMoney;
                        let whiteSpiritNumber=$scope.member.whiteSpiritNumber;
                        let cashMoney=$scope.member.cashMoney;


                        let resp = await membersClient.putInsertMembers(name, phone, money, number, remark, whiteSpiritMoney,whiteSpiritNumber,cashMoney);
                        if (resp.errcode === 0) {
                            this.pageChanged();
                            $notify.success("新增会员成功");
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


    // #region openPositionModal
    async openMemberModal(l): Promise<void> {
        this.$uibModal.open({
            templateUrl: "memberTemplate.html",
            controller: async ($scope, $uibModalInstance: uib.IModalInstanceService,
                $http: ng.IHttpService, $q: ng.IQService, $swal, $notify) => {

                //获取行业类别和职业类别
                let dictionariesClient: webapi.DictionariesClient = this.api.getClient(webapi.DictionariesClient);
                let datatypeSource = await dictionariesClient.getDictionariesType(1, 3);
                $scope.id = l.id;
                $scope.typeList = datatypeSource.data.industrytypeList;
                $scope.member = {};
                $scope.member.name = l.name;
                $scope.member.phone = l.phone;
                $scope.member.money = l.money;
                $scope.member.number = l.number;
                $scope.member.type = _.find($scope.typeList, (item) => item.id === l.type);
                $scope.member.remark = l.remark;
                $scope.member.whiteSpiritMoney = l.whiteSpiritMoney;
                $scope.member.whiteSpiritNumber = l.whiteSpiritNumber; 
                $scope.member.cashMoney = l.cashMoney;
                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
                };

                $scope.ok = async () => {
                    try {
                        if ($scope.member.name === undefined) {
                            $swal.error({ title: "请填写会员名称!" });
                            return;
                        }
                        if ($scope.member.phone === undefined) {
                            $swal.error({ title: "请填写手机号!" });
                            return;
                        }
                        if ($scope.member.money === undefined) {
                            $swal.error({ title: "请填写预存金额!" });
                            return;
                        }
                        if ($scope.member.number === undefined) {
                            $swal.error({ title: "请填写预存数量!" });
                            return;
                        }
                        //if ($scope.member.type === undefined) {
                            //$swal.error({ title: "请填写存酒类别!" });
                            //return;
                        //}
                        if ($scope.member.whiteSpiritMoney === undefined) {
                            $swal.error({ title: "请填写白酒预存金额!" });
                            return;
                        }
                        if ($scope.member.whiteSpiritNumber === undefined) {
                            $swal.error({ title: "请填写白酒预存数量!" });
                            return;
                        }
                        if ($scope.member.cashMoney === undefined) {
                            $swal.error({ title: "请填写现金金额!" });
                            return;
                        }
                        let name = $scope.member.name;
                        let phone = $scope.member.phone;
                        let money = $scope.member.money;
                        let number = $scope.member.number;
                        //let type = $scope.member.type.id;
                        let remark = $scope.member.remark;

                        let whiteSpiritMoney=$scope.member.whiteSpiritMoney;
                        let whiteSpiritNumber=$scope.member.whiteSpiritNumber; 
                        let cashMoney=$scope.member.cashMoney;
                        let membersClient: webapi.MembersClient = this.api.getClient(webapi.MembersClient);
                        let resp = await membersClient.putUpdateMembers($scope.id, name, phone, money, number, remark, whiteSpiritMoney,whiteSpiritNumber,cashMoney);
                        if (resp.errcode === 0) {
                            this.pageChanged();
                            this.$notify.success("会员更新成功");
                            $uibModalInstance.close();
                        }
                        else {
                            $swal.error({ title: "更新异常,请联系管理员!" });
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