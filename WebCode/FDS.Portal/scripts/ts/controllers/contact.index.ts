
import * as uirouter from "angular-ui-router";
import * as uib from "angular-ui-bootstrap";
import config from "../config";
import ng from "angular";
import BaseCtrl from "./base";
import enums from "../models/enums";
import * as webapi from "../services/api";
import _ from "lodash";
import moment from "moment";

export class ContactIndexCtrl extends BaseCtrl {

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
      
        scope.openContactModal = this.openContactModal.bind(this);
        scope.showContaceModel = this.showContaceModel.bind(this);
        scope.deleteContact = this.deleteContact.bind(this);
        scope.import = this.import.bind(this);

        //绑定 dept
        let webEmployeeClient: webapi.WebEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
        let depeData = await webEmployeeClient.fetchDepartments();
        scope.deptlist = depeData.data;
        this.pageChanged();

        // 导出Contact
        scope.export = async ($filter) => {
            let webEmployeeClient: webapi.WebEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
            let resp = await webEmployeeClient.export();
            let blob = new Blob([resp.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            let today = moment().format('l');
            let fileName ="Contact_" + today;
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




    // #region 删除
    async deleteContact(l): Promise<void> {
        await this.$swal.confirm({
            title: "Are you sure you want to delete this contact?",
        });

        try {
            //
            let webEmployeeClient: webapi.WebEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);

            let res = await webEmployeeClient.deleteEmployeeByEmpNo(l.id);
            
            if (res.errcode === 0) {
                this.pageChanged();
                this.$notify.success("Delete success!");
            } else {
                this.$swal.error({ title: "Delete failed!", text: res.errmsg });
            }
        } catch (err) {
            console.error(err);
            this.$swal.error({ title: "Delete the exception, please contact the administrator" });
        }
    }
    // #endregion

    //导入Contact
    async import(file): Promise<void> {
        if (!file) return;

        if (!this.validateFileSize(file, config.uploadFileMaxSize20)) return;

        try {

            //let webEmployeeClient: webapi.WebEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);

            let resp = await this.Upload.upload({
                method: "POST",
                url: `${config.webapi}/api/WebEmployee/Import`,
                data: { file: file },
            });
            
            //let depeData = await webEmployeeClient.import();


            if (resp.status === 200) {
                if (resp.data["errcode"] === 0) {
                    this.$notify.success("Imported contact list successfully!");
                } else {
                    let desc = resp.data["errdescription"];
                    if (desc) console.error(desc);
                    this.$swal.warning({ title: "Failed to import contact list", text: resp.data["errmsg"] });
                }
            }
            else {
                this.$swal.error({ title: "Import contact exception, please contact the administrator" });
            }
        } catch (err) {
            console.error(err);
            this.$notify.error("Import contact exception, please contact the administrator");
        }
    }


    // #region 查询分页
    async pageChanged(): Promise<void> {
        let scope: any = this.$scope;
        let query = scope.query;
        query.loading = true;
        try {
            let query = scope.query;
            let webEmployeeClient: webapi.WebEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
            let emplyoeeSearchVM: webapi.EmplyoeeSearchVM = this.api.getClient(webapi.EmplyoeeSearchVM);

            emplyoeeSearchVM.name = query.name;
            emplyoeeSearchVM.empNo = query.empNo;
            emplyoeeSearchVM.dept = query.dept;
            emplyoeeSearchVM.page = scope.pageIndex, 
            emplyoeeSearchVM.size = scope.pageSize;
            let dataSource = await webEmployeeClient.getEmployeePage(emplyoeeSearchVM);
            scope.list = dataSource.data.list;
            scope.totalCount = dataSource.data.totalCount;
           
            query.loading = false;

        } catch (err) {
            console.error(err);
            this.$notify.error("Failed to get contact list");
        }
        finally {
            query.loading = false;
        }
    }
    // #endregion 分页

    // #region showPositionModel
    async showContaceModel(): Promise<void> {
        this.$uibModal.open({
            templateUrl: "contaceAddTemplate.html",
            controller: async ($scope, $uibModalInstance: uib.IModalInstanceService,
                $http: ng.IHttpService, $q: ng.IQService, $swal, $notify) => {
                $scope.contact = {};
                //绑定 dept
                let webEmployeeClient: webapi.WebEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
                let depeData = await webEmployeeClient.fetchDepartments();
                $scope.deptlist = depeData.data;
                $scope.genderlist = [
                    { name: "Male", id: 1 },
                    { name: "Female", id: 2 },
                ];
                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
                };

                $scope.ok = async () => {
                    try {

                        if ($scope.contact.empName === undefined) {
                            $swal.error({ title: "请填写empName!" });
                            return;
                        }
                        if ($scope.contact.gender === undefined) {
                            $swal.error({ title: "请选择gender!" });
                            return;
                        }
                        if ($scope.contact.empNo === undefined) {
                            $swal.error({ title: "请填写empNo!" });
                            return;
                        }
                        if ($scope.contact.department === undefined) {
                            $swal.error({ title: "请选择department!" });
                            return;
                        }

                        if ($scope.contact.title === undefined) {
                            $swal.error({ title: "请填写Title!" });
                            return;
                        }
                        if ($scope.contact.officePhone === undefined) {
                            $swal.error({ title: "请填写officePhone!" });
                            return;
                        }
                        if ($scope.contact.personalPhone === undefined) {
                            $swal.error({ title: "请填写personalPhone!" });
                            return;
                        }
                        //绑定 dept
                        let webEmployeeClient: webapi.WebEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
                        let employeeInfo: webapi.EmployeeInfo = this.api.getClient(webapi.EmployeeInfo);

                        employeeInfo.department = $scope.contact.department.department;
                        employeeInfo.empName = $scope.contact.empName;
                        employeeInfo.empNo = $scope.contact.empNo;
                        employeeInfo.gender = $scope.contact.gender.id;
                        employeeInfo.title = $scope.contact.title;
                        employeeInfo.officePhone = $scope.contact.officePhone;
                        employeeInfo.personalPhone = $scope.contact.personalPhone;

                        let resp = await webEmployeeClient.addEmployee(employeeInfo);
                        if (resp.errcode === 0) {
                            this.pageChanged();
                            $notify.success("Save success!");
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
    async openContactModal(l): Promise<void> {
        this.$uibModal.open({
            templateUrl: "contactTemplate.html",
            controller: async ($scope, $uibModalInstance: uib.IModalInstanceService,
                $http: ng.IHttpService, $q: ng.IQService, $swal, $notify) => {

                //绑定 dept
                let webEmployeeClient: webapi.WebEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
                let depeData = await webEmployeeClient.fetchDepartments();
                $scope.deptlist = depeData.data;
                $scope.genderlist = [
                    { name: "Male", id: 1 },
                    { name: "Female", id: 2 },
                ];

                $scope.contact = {};
                $scope.contact.id = l.id;
                $scope.contact.empName = l.empName;
                $scope.contact.empNo = l.empNo;
                $scope.contact.title = l.title;
                $scope.contact.officePhone = l.officePhone;
                $scope.contact.department = _.find($scope.deptlist, (item) => item.department === l.department);
                $scope.contact.gender = _.find($scope.genderlist, (item) => item.id === l.gender);

                $scope.contact.personalPhone = l.personalPhone;

                $scope.close = () => {
                    $uibModalInstance.dismiss("dismiss");
                };

                $scope.ok = async () => {
                    try {
                        if ($scope.contact.empName === undefined) {
                            $swal.error({ title: "请填写empName!" });
                            return;
                        }
                        if ($scope.contact.gender === undefined) {
                            $swal.error({ title: "请选择gender!" });
                            return;
                        }
                        if ($scope.contact.empNo === undefined) {
                            $swal.error({ title: "请填写empNo!" });
                            return;
                        }
                        if ($scope.contact.department === undefined) {
                            $swal.error({ title: "请选择department!" });
                            return;
                        }
                       
                        if ($scope.contact.title === undefined) {
                            $swal.error({ title: "请填写Title!" });
                            return;
                        }
                        if ($scope.contact.officePhone === undefined) {
                            $swal.error({ title: "请填写officePhone!" });
                            return;
                        }
                        if ($scope.contact.personalPhone === undefined) {
                            $swal.error({ title: "请填写personalPhone!" });
                            return;
                        }
                   

                        //绑定 dept
                        let webEmployeeClient: webapi.WebEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
                      
                        let employeeInfo: webapi.EmployeeInfo = this.api.getClient(webapi.EmployeeInfo);
                        employeeInfo.id = $scope.contact.id;
                        employeeInfo.department = $scope.contact.department.department;
                        employeeInfo.empName = $scope.contact.empName;
                        employeeInfo.empNo = $scope.contact.empNo;
                        employeeInfo.gender = $scope.contact.gender.id;
                        employeeInfo.title = $scope.contact.title;
                        employeeInfo.officePhone = $scope.contact.officePhone;
                        employeeInfo.personalPhone = $scope.contact.personalPhone;

                        let resp = await webEmployeeClient.editEmployee(employeeInfo);
                        if (resp.errcode === 0) {
                            this.pageChanged();
                            this.$notify.success("Update successful!");
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