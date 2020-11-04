System.register(["./base", "../services/api", "moment"], function (exports_1, context_1) {
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
    var base_1, webapi, moment_1, ResumeIndexCtrl;
    return {
        setters: [
            function (base_1_1) {
                base_1 = base_1_1;
            },
            function (webapi_1) {
                webapi = webapi_1;
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }
        ],
        execute: function () {
            ResumeIndexCtrl = /** @class */ (function (_super) {
                __extends(ResumeIndexCtrl, _super);
                function ResumeIndexCtrl($scope, $http, $q, $swal, $timeout, $state, $stateParams, principal, $rootScope, $uibModal, $location, $urlService, $notify, $i18next, api, validateFileSize, Upload) {
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
                ResumeIndexCtrl.prototype.init = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        var scope;
                        return __generator(this, function (_a) {
                            scope = this.$scope;
                            scope.query = {};
                            this.id = this.$stateParams["id"];
                            if (this.id === null) {
                                this.$state.go("position.index");
                                this.$notify.info("会员信息丢失，请重新选择会员");
                                return [2 /*return*/];
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
                            scope.export = function ($filter) { return __awaiter(_this, void 0, void 0, function () {
                                var recordsClient, resp, blob, today, fileName;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            recordsClient = this.api.getClient(webapi.RecordsClient);
                                            return [4 /*yield*/, recordsClient.export(this.id)];
                                        case 1:
                                            resp = _a.sent();
                                            blob = new Blob([resp.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                                            today = moment_1.default().format('l');
                                            fileName = this.fileName + "_" + today;
                                            this.downLoad(blob, fileName);
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            return [2 /*return*/];
                        });
                    });
                };
                ResumeIndexCtrl.prototype.downLoad = function (blob, fileName) {
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
                // #region 查询分页
                ResumeIndexCtrl.prototype.pageChanged = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, query, query_1, membersClient, member, recordsClient, dataSource, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    scope = this.$scope;
                                    query = scope.query;
                                    query.loading = true;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 4, 5, 6]);
                                    query_1 = scope.query;
                                    membersClient = this.api.getClient(webapi.MembersClient);
                                    return [4 /*yield*/, membersClient.getMember(scope.id)];
                                case 2:
                                    member = _a.sent();
                                    query_1.name = member.data.name;
                                    query_1.phone = member.data.phone;
                                    query_1.totalmoney = member.data.money;
                                    query_1.whiteSpirittotalmoney = member.data.whiteSpiritMoney;
                                    query_1.cashTotalMoney = member.data.cashMoney;
                                    recordsClient = this.api.getClient(webapi.RecordsClient);
                                    return [4 /*yield*/, recordsClient.getRecordList(scope.pageIndex, scope.pageSize, scope.id)];
                                case 3:
                                    dataSource = _a.sent();
                                    scope.list = dataSource.data.list;
                                    scope.totalCount = dataSource.data.totalCount;
                                    query_1.loading = false;
                                    return [3 /*break*/, 6];
                                case 4:
                                    err_1 = _a.sent();
                                    console.error(err_1);
                                    this.$notify.error("获取消费记录失败");
                                    return [3 /*break*/, 6];
                                case 5:
                                    query.loading = false;
                                    return [7 /*endfinally*/];
                                case 6: return [2 /*return*/];
                            }
                        });
                    });
                };
                // #endregion 分页
                // #region openPositionModal
                ResumeIndexCtrl.prototype.openRecordModal = function (l) {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.$uibModal.open({
                                templateUrl: "opRecordTemplate.html",
                                controller: function ($scope, $uibModalInstance, $http, $q, $swal, $notify) {
                                    $scope.name = l.name;
                                    $scope.phone = l.phone;
                                    $scope.createDate = l.createDate;
                                    $scope.money = l.money;
                                    $scope.types = l.types;
                                    $scope.description = l.description;
                                    $scope.close = function () {
                                        $uibModalInstance.dismiss("dismiss");
                                    };
                                },
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
                ResumeIndexCtrl.prototype.showRecordModel = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            this.$uibModal.open({
                                templateUrl: "recordTemplate.html",
                                controller: function ($scope, $uibModalInstance, $http, $q, $swal, $notify) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    var dictionariesClient, datatypeSource, membersClient, member;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                $scope.record = {};
                                                $scope.id = this.id;
                                                dictionariesClient = this.api.getClient(webapi.DictionariesClient);
                                                return [4 /*yield*/, dictionariesClient.getDictionariesTypeAll(0, 1)];
                                            case 1:
                                                datatypeSource = _a.sent();
                                                $scope.typeList = datatypeSource.data.industrytypeList;
                                                membersClient = this.api.getClient(webapi.MembersClient);
                                                return [4 /*yield*/, membersClient.getMember($scope.id)];
                                            case 2:
                                                member = _a.sent();
                                                $scope.record.name = member.data.name;
                                                $scope.record.phone = member.data.phone;
                                                $scope.record.totalmoney = member.data.money;
                                                $scope.record.whiteSpirittotalmoney = member.data.whiteSpiritMoney;
                                                $scope.record.cashTotalMoney = member.data.cashMoney;
                                                $scope.close = function () {
                                                    $uibModalInstance.dismiss("dismiss");
                                                };
                                                $scope.ok = function () { return __awaiter(_this, void 0, void 0, function () {
                                                    var ltype, money, remark, recordsClient, resp, err_2;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                if ($scope.record.type === undefined) {
                                                                    $swal.error({ title: "请选择消费类别" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.record.money === undefined) {
                                                                    $swal.error({ title: "请填写消费金额!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.record.money <= 0) {
                                                                    $swal.error({ title: "消费金额不能小于0元!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                ltype = $scope.record.type.id;
                                                                if (ltype === 1) {
                                                                    if ($scope.record.totalmoney < $scope.record.money) {
                                                                        $swal.error({ title: "消费金额超出啤酒系统余额，请先预存金额再消费!" });
                                                                        return [2 /*return*/];
                                                                    }
                                                                }
                                                                else if (ltype === 2) {
                                                                    if ($scope.record.whiteSpirittotalmoney < $scope.record.money) {
                                                                        $swal.error({ title: "消费金额超出白酒系统余额，请先预存金额再消费!" });
                                                                        return [2 /*return*/];
                                                                    }
                                                                }
                                                                else if (ltype === 3) {
                                                                    if ($scope.record.cashTotalMoney < $scope.record.money) {
                                                                        $swal.error({ title: "消费金额超出现金系统余额，请先预存金额再消费!" });
                                                                        return [2 /*return*/];
                                                                    }
                                                                }
                                                                money = $scope.record.money;
                                                                remark = $scope.record.description;
                                                                recordsClient = this.api.getClient(webapi.RecordsClient);
                                                                return [4 /*yield*/, recordsClient.putInsertRecords(this.id, money, remark, ltype)];
                                                            case 1:
                                                                resp = _a.sent();
                                                                if (resp.errcode === 0) {
                                                                    this.pageChanged();
                                                                    $notify.success("新增消费记录成功");
                                                                    $uibModalInstance.close();
                                                                }
                                                                else {
                                                                    $swal.error({ title: "新增异常,请联系管理员!" });
                                                                    $uibModalInstance.close();
                                                                }
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                err_2 = _a.sent();
                                                                console.error(err_2);
                                                                $swal.error({ title: "新增异常,请联系管理员!" });
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
                return ResumeIndexCtrl;
            }(base_1.default));
            exports_1("ResumeIndexCtrl", ResumeIndexCtrl);
        }
    };
});
//# sourceMappingURL=position.resumeIndex.js.map