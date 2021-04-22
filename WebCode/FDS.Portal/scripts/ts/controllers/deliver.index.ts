
import * as uirouter from "angular-ui-router";
import * as uib from "angular-ui-bootstrap";
import config from "../config";
import ng from "angular";
import BaseCtrl from "./base";
import enums from "../models/enums";
import * as webapi from "../services/api";
import _ from "lodash";

export class DeliverIndexCtrl extends BaseCtrl {

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
        scope.pageChanged = this.pageChanged.bind(this);

        scope.import = this.import.bind(this);
        this.pageChanged();

        scope.webDeliver = {};
        scope.ok = async () => {
            try {

                if (scope.webDeliver.name === undefined) {
                    this.$swal.error({ title: "请填写Name!" });
                    return;
                }

                if (scope.webDeliver.officePhone === undefined) {
                    this.$swal.error({ title: "请填写Office Phone!" });
                    return;
                }

                if (scope.webDeliver.personalPhone === undefined) {
                    this.$swal.error({ title: "请填写Personal Phone!" });
                    return;
                }

                 let resp =await this.Upload.upload({
                        method: "POST",
                     url: `${config.webapi}/api/webDeliverContact/import`,
                     data: { file: scope.file },
                  });

                  if (resp.status === 200) {
                       if (resp.data["errcode"] === 0) {
                            scope.webDeliver.iconUrl = `${config.webapi}` + resp.data["data"].filePath;
                            scope.webDeliver.filepath = resp.data["data"].filePath;

                           let webDeliverContactClient: webapi.WebDeliverContactClient = this.api.getClient(webapi.WebDeliverContactClient);
                            let re = await webDeliverContactClient.saveDeliver(scope.webDeliver.name, scope.webDeliver.officePhone, scope.webDeliver.personalPhone, scope.webDeliver.filepath);
                            if (re.errcode === 0) {
                                this.pageChanged();
                                this.$notify.success("Update successful!");
                                //$uibModalInstance.close();
                            }
                            else {
                                this.$swal.error({ title: re.errmsg });
                                //$uibModalInstance.close();
                            }

                        }
                       else {
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
                this.$swal.error({ title: "Update exception, please contact administrator!" });
            }
        };
    }

    // #region 查询分页
    async pageChanged(): Promise<void> {
        let scope: any = this.$scope;
        let query = scope.query;
        query.loading = true;
        try {
            let query = scope.query;
            let webDeliverContactClient: webapi.WebDeliverContactClient = this.api.getClient(webapi.WebDeliverContactClient);
            let dataSource = await webDeliverContactClient.get();
            //scope.list = dataSource.data;
            
            scope.webDeliver.name = dataSource.data.name;
            scope.webDeliver.officePhone = dataSource.data.officePhone;
            scope.webDeliver.personalPhone = dataSource.data.personalPhone;
            scope.webDeliver.iconUrl = `${config.webapi}`  + dataSource.data.imgPath;
            scope.webDeliver.filepath = dataSource.data.imgPath;
            query.loading = false;

        } catch (err) {
            console.error(err);
            this.$notify.error("For failure");
        }
        finally {
            query.loading = false;
        }
    }
    // #endregion 分页


    //导入头像
    async import(file): Promise<void> {

        let scope: any = this.$scope;
        let query = scope.query;

        if (!file) return;

        if (!this.validateFileSize(file, config.uploadFileMaxSize20)) return;

        try {

            scope.file = file;
            scope.reader = new FileReader();//
            scope.guid = (new Date()).valueOf();   //通过时间戳创建一个随机数，作为键名使用
            scope.reader.readAsDataURL(file);  //FileReader的方法，把图片转成base64
            scope.reader.onload = function (ev) {
                scope.$apply(function () {
                    //scope.thumb[scope.guid] = {
                    //    imgSrc: ev.target.result,  //接收base64
                    //}
                    scope.webDeliver.iconUrl = ev.target.result; //接收base64
                });
            };

        } catch (err) {
            console.error(err);
            this.$notify.error("Import contact exception, please contact the administrator");
        }
    }



}