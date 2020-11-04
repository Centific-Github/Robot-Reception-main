System.register(["../config", "./base", "../services/api", "lodash", "moment"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __moduleName = context_1 && context_1.id;
    var config_1, base_1, webapi, lodash_1, moment_1, ContactIndexCtrl;
    return {
        setters: [
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (base_1_1) {
                base_1 = base_1_1;
            },
            function (webapi_1) {
                webapi = webapi_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }
        ],
        execute: function () {
            ContactIndexCtrl = /** @class */ (function (_super) {
                __extends(ContactIndexCtrl, _super);
                function ContactIndexCtrl($scope, $http, $q, $swal, $timeout, $state, $stateParams, principal, $rootScope, $uibModal, $location, $urlService, $notify, $i18next, api, validateFileSize, Upload) {
                    var _this = _super.call(this, $notify, $i18next, $scope) || this;
                    _this.$scope = $scope;
                    _this.$http = $http;
                    _this.$q = $q;
                    _this.$swal = $swal;
                    _this.$timeout = $timeout;
                    _this.$state = $state;
                    _this.$stateParams = $stateParams;
                    _this.principal = principal;
                    _this.$rootScope = $rootScope;
                    _this.$uibModal = $uibModal;
                    _this.$location = $location;
                    _this.$urlService = $urlService;
                    _this.$notify = $notify;
                    _this.$i18next = $i18next;
                    _this.api = api;
                    _this.validateFileSize = validateFileSize;
                    _this.Upload = Upload;
                    _this.init();
                    return _this;
                }
                ContactIndexCtrl.prototype.init = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        var scope, webEmployeeClient, depeData;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    scope = this.$scope;
                                    scope.query = {};
                                    scope.pageIndex = 1;
                                    scope.pageSize = 10;
                                    scope.pageChanged = this.pageChanged.bind(this);
                                    scope.openContactModal = this.openContactModal.bind(this);
                                    scope.showContaceModel = this.showContaceModel.bind(this);
                                    scope.deleteContact = this.deleteContact.bind(this);
                                    scope.import = this.import.bind(this);
                                    webEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
                                    return [4 /*yield*/, webEmployeeClient.fetchDepartments()];
                                case 1:
                                    depeData = _a.sent();
                                    scope.deptlist = depeData.data;
                                    this.pageChanged();
                                    // 导出Contact
                                    scope.export = function ($filter) { return __awaiter(_this, void 0, void 0, function () {
                                        var webEmployeeClient, resp, blob, today, fileName;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    webEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
                                                    return [4 /*yield*/, webEmployeeClient.export()];
                                                case 1:
                                                    resp = _a.sent();
                                                    blob = new Blob([resp.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                                                    today = moment_1.default().format('l');
                                                    fileName = "Contact_" + today;
                                                    this.downLoad(blob, fileName);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); };
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                ContactIndexCtrl.prototype.downLoad = function (blob, fileName) {
                    return __awaiter(this, void 0, void 0, function () {
                        var link;
                        return __generator(this, function (_a) {
                            if (window.navigator.msSaveOrOpenBlob) { // For IE:
                                navigator.msSaveBlob(blob, fileName + ".xlsx");
                            }
                            else { // For other browsers:
                                link = document.createElement('a');
                                link.href = window.URL.createObjectURL(blob);
                                link.download = fileName;
                                link.click();
                                window.URL.revokeObjectURL(link.href);
                            }
                            return [2 /*return*/];
                        });
                    });
                };
                // #region 删除
                ContactIndexCtrl.prototype.deleteContact = function (l) {
                    return __awaiter(this, void 0, void 0, function () {
                        var webEmployeeClient, res, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.$swal.confirm({
                                        title: "Are you sure you want to delete this contact?",
                                    })];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 4, , 5]);
                                    webEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
                                    return [4 /*yield*/, webEmployeeClient.deleteEmployeeByEmpNo(l.id)];
                                case 3:
                                    res = _a.sent();
                                    if (res.errcode === 0) {
                                        this.pageChanged();
                                        this.$notify.success("Delete success!");
                                    }
                                    else {
                                        this.$swal.error({ title: "Delete failed!", text: res.errmsg });
                                    }
                                    return [3 /*break*/, 5];
                                case 4:
                                    err_1 = _a.sent();
                                    console.error(err_1);
                                    this.$swal.error({ title: "Delete the exception, please contact the administrator" });
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                // #endregion
                //导入Contact
                ContactIndexCtrl.prototype.import = function (file) {
                    return __awaiter(this, void 0, void 0, function () {
                        var resp, desc, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!file)
                                        return [2 /*return*/];
                                    if (!this.validateFileSize(file, config_1.default.uploadFileMaxSize20))
                                        return [2 /*return*/];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, this.Upload.upload({
                                            method: "POST",
                                            url: config_1.default.webapi + "/api/WebEmployee/Import",
                                            data: { file: file },
                                        })];
                                case 2:
                                    resp = _a.sent();
                                    //let depeData = await webEmployeeClient.import();
                                    if (resp.status === 200) {
                                        if (resp.data["errcode"] === 0) {
                                            this.$notify.success("Imported contact list successfully!");
                                        }
                                        else {
                                            desc = resp.data["errdescription"];
                                            if (desc)
                                                console.error(desc);
                                            this.$swal.warning({ title: "Failed to import contact list", text: resp.data["errmsg"] });
                                        }
                                    }
                                    else {
                                        this.$swal.error({ title: "Import contact exception, please contact the administrator" });
                                    }
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_2 = _a.sent();
                                    console.error(err_2);
                                    this.$notify.error("Import contact exception, please contact the administrator");
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                };
                // #region 查询分页
                ContactIndexCtrl.prototype.pageChanged = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, query, query_1, webEmployeeClient, emplyoeeSearchVM, dataSource, err_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    scope = this.$scope;
                                    query = scope.query;
                                    query.loading = true;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    query_1 = scope.query;
                                    webEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
                                    emplyoeeSearchVM = this.api.getClient(webapi.EmplyoeeSearchVM);
                                    emplyoeeSearchVM.name = query_1.name;
                                    emplyoeeSearchVM.empNo = query_1.empNo;
                                    emplyoeeSearchVM.dept = query_1.dept;
                                    emplyoeeSearchVM.page = scope.pageIndex,
                                        emplyoeeSearchVM.size = scope.pageSize;
                                    return [4 /*yield*/, webEmployeeClient.getEmployeePage(emplyoeeSearchVM)];
                                case 2:
                                    dataSource = _a.sent();
                                    scope.list = dataSource.data.list;
                                    scope.totalCount = dataSource.data.totalCount;
                                    query_1.loading = false;
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_3 = _a.sent();
                                    console.error(err_3);
                                    this.$notify.error("Failed to get contact list");
                                    return [3 /*break*/, 5];
                                case 4:
                                    query.loading = false;
                                    return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                // #endregion 分页
                // #region showPositionModel
                ContactIndexCtrl.prototype.showContaceModel = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            this.$uibModal.open({
                                templateUrl: "contaceAddTemplate.html",
                                controller: function ($scope, $uibModalInstance, $http, $q, $swal, $notify) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    var webEmployeeClient, depeData;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                $scope.contact = {};
                                                webEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
                                                return [4 /*yield*/, webEmployeeClient.fetchDepartments()];
                                            case 1:
                                                depeData = _a.sent();
                                                $scope.deptlist = depeData.data;
                                                $scope.genderlist = [
                                                    { name: "Male", id: 1 },
                                                    { name: "Female", id: 2 },
                                                ];
                                                $scope.close = function () {
                                                    $uibModalInstance.dismiss("dismiss");
                                                };
                                                $scope.ok = function () { return __awaiter(_this, void 0, void 0, function () {
                                                    var webEmployeeClient_1, employeeInfo, resp, err_4;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                if ($scope.contact.empName === undefined) {
                                                                    $swal.error({ title: "请填写empName!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.contact.gender === undefined) {
                                                                    $swal.error({ title: "请选择gender!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.contact.empNo === undefined) {
                                                                    $swal.error({ title: "请填写empNo!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.contact.department === undefined) {
                                                                    $swal.error({ title: "请选择department!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.contact.title === undefined) {
                                                                    $swal.error({ title: "请填写Title!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.contact.officePhone === undefined) {
                                                                    $swal.error({ title: "请填写officePhone!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.contact.personalPhone === undefined) {
                                                                    $swal.error({ title: "请填写personalPhone!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                webEmployeeClient_1 = this.api.getClient(webapi.WebEmployeeClient);
                                                                employeeInfo = this.api.getClient(webapi.EmployeeInfo);
                                                                employeeInfo.department = $scope.contact.department.department;
                                                                employeeInfo.empName = $scope.contact.empName;
                                                                employeeInfo.empNo = $scope.contact.empNo;
                                                                employeeInfo.gender = $scope.contact.gender.id;
                                                                employeeInfo.title = $scope.contact.title;
                                                                employeeInfo.officePhone = $scope.contact.officePhone;
                                                                employeeInfo.personalPhone = $scope.contact.personalPhone;
                                                                return [4 /*yield*/, webEmployeeClient_1.addEmployee(employeeInfo)];
                                                            case 1:
                                                                resp = _a.sent();
                                                                if (resp.errcode === 0) {
                                                                    this.pageChanged();
                                                                    $notify.success("Save success!");
                                                                    $uibModalInstance.close();
                                                                }
                                                                else {
                                                                    $swal.error({ title: resp.errmsg });
                                                                    //$uibModalInstance.close();
                                                                }
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                err_4 = _a.sent();
                                                                console.error(err_4);
                                                                $swal.error({ title: "New exception, please contact the administrator!" });
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); };
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                                resolve: {},
                                size: 'lg',
                            }).result.then(function (data) {
                            }).catch(function () { });
                            return [2 /*return*/];
                        });
                    });
                };
                // #endregion
                // #region openPositionModal
                ContactIndexCtrl.prototype.openContactModal = function (l) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            this.$uibModal.open({
                                templateUrl: "contactTemplate.html",
                                controller: function ($scope, $uibModalInstance, $http, $q, $swal, $notify) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    var webEmployeeClient, depeData;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                webEmployeeClient = this.api.getClient(webapi.WebEmployeeClient);
                                                return [4 /*yield*/, webEmployeeClient.fetchDepartments()];
                                            case 1:
                                                depeData = _a.sent();
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
                                                $scope.contact.department = lodash_1.default.find($scope.deptlist, function (item) { return item.department === l.department; });
                                                $scope.contact.gender = lodash_1.default.find($scope.genderlist, function (item) { return item.id === l.gender; });
                                                $scope.contact.personalPhone = l.personalPhone;
                                                $scope.close = function () {
                                                    $uibModalInstance.dismiss("dismiss");
                                                };
                                                $scope.ok = function () { return __awaiter(_this, void 0, void 0, function () {
                                                    var webEmployeeClient_2, employeeInfo, resp, err_5;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                if ($scope.contact.empName === undefined) {
                                                                    $swal.error({ title: "请填写empName!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.contact.gender === undefined) {
                                                                    $swal.error({ title: "请选择gender!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.contact.empNo === undefined) {
                                                                    $swal.error({ title: "请填写empNo!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.contact.department === undefined) {
                                                                    $swal.error({ title: "请选择department!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.contact.title === undefined) {
                                                                    $swal.error({ title: "请填写Title!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.contact.officePhone === undefined) {
                                                                    $swal.error({ title: "请填写officePhone!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.contact.personalPhone === undefined) {
                                                                    $swal.error({ title: "请填写personalPhone!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                webEmployeeClient_2 = this.api.getClient(webapi.WebEmployeeClient);
                                                                employeeInfo = this.api.getClient(webapi.EmployeeInfo);
                                                                employeeInfo.id = $scope.contact.id;
                                                                employeeInfo.department = $scope.contact.department.department;
                                                                employeeInfo.empName = $scope.contact.empName;
                                                                employeeInfo.empNo = $scope.contact.empNo;
                                                                employeeInfo.gender = $scope.contact.gender.id;
                                                                employeeInfo.title = $scope.contact.title;
                                                                employeeInfo.officePhone = $scope.contact.officePhone;
                                                                employeeInfo.personalPhone = $scope.contact.personalPhone;
                                                                return [4 /*yield*/, webEmployeeClient_2.editEmployee(employeeInfo)];
                                                            case 1:
                                                                resp = _a.sent();
                                                                if (resp.errcode === 0) {
                                                                    this.pageChanged();
                                                                    this.$notify.success("Update successful!");
                                                                    $uibModalInstance.close();
                                                                }
                                                                else {
                                                                    $swal.error({ title: resp.errmsg });
                                                                    $uibModalInstance.close();
                                                                }
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                err_5 = _a.sent();
                                                                console.error(err_5);
                                                                $swal.error({ title: "Update exception, please contact administrator!" });
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); };
                                                return [2 /*return*/];
                                        }
                                    });
                                }); },
                                resolve: {},
                                size: 'lg',
                            }).result.then(function (data) {
                            }).catch(function () { });
                            return [2 /*return*/];
                        });
                    });
                };
                return ContactIndexCtrl;
            }(base_1.default));
            exports_1("ContactIndexCtrl", ContactIndexCtrl);
        }
    };
});
//# sourceMappingURL=contact.index.js.map