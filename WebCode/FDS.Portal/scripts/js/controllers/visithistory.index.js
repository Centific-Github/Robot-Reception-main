System.register(["./base", "../services/api", "lodash"], function (exports_1, context_1) {
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
    var base_1, webapi, lodash_1, VisithistoryIndexCtrl;
    return {
        setters: [
            function (base_1_1) {
                base_1 = base_1_1;
            },
            function (webapi_1) {
                webapi = webapi_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            VisithistoryIndexCtrl = /** @class */ (function (_super) {
                __extends(VisithistoryIndexCtrl, _super);
                function VisithistoryIndexCtrl($scope, $http, $q, $swal, $timeout, $state, $stateParams, principal, $rootScope, $uibModal, $location, $urlService, $notify, $i18next, api, validateFileSize, Upload) {
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
                VisithistoryIndexCtrl.prototype.init = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, dictionariesClient, datatypeSource;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    scope = this.$scope;
                                    scope.query = {};
                                    scope.pageIndex = 1;
                                    scope.pageSize = 20;
                                    scope.pageChanged = this.pageChanged.bind(this);
                                    scope.showMemberModel = this.showMemberModel.bind(this);
                                    scope.openMemberModal = this.openMemberModal.bind(this);
                                    dictionariesClient = this.api.getClient(webapi.DictionariesClient);
                                    return [4 /*yield*/, dictionariesClient.getDictionariesTypeAll(0, 1)];
                                case 1:
                                    datatypeSource = _a.sent();
                                    scope.industrytypeList = datatypeSource.data.industrytypeList;
                                    this.pageChanged();
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                // #region 查询分页
                VisithistoryIndexCtrl.prototype.pageChanged = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, query, query_1, webVisitHistoryClient, historySearchVM, dataSource, err_1;
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
                                    webVisitHistoryClient = this.api.getClient(webapi.WebVisitHistoryClient);
                                    historySearchVM = this.api.getClient(webapi.HistorySearchVM);
                                    historySearchVM.page = scope.pageIndex;
                                    historySearchVM.size = scope.pageSize;
                                    historySearchVM.startTime = query_1.startTime;
                                    historySearchVM.endTime = query_1.endTime;
                                    return [4 /*yield*/, webVisitHistoryClient.searchHistoryPage(historySearchVM)];
                                case 2:
                                    dataSource = _a.sent();
                                    scope.list = dataSource.data.list;
                                    scope.totalCount = dataSource.data.totalCount;
                                    query_1.loading = false;
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_1 = _a.sent();
                                    console.error(err_1);
                                    this.$notify.error("Failed to get list");
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
                VisithistoryIndexCtrl.prototype.showMemberModel = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            this.$uibModal.open({
                                templateUrl: "testTemplate.html",
                                controller: function ($scope, $uibModalInstance, $http, $q, $swal, $notify) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    return __generator(this, function (_a) {
                                        $scope.member = {};
                                        //获取行业类别和职业类别
                                        //let dictionariesClient: webapi.DictionariesClient = this.api.getClient(webapi.DictionariesClient);
                                        //let datatypeSource = await dictionariesClient.getDictionariesTypeAll(0, 1);
                                        //$scope.industrytypeList = datatypeSource.data.industrytypeList;
                                        //$scope.typeList = datatypeSource.data.industrytypeList;
                                        $scope.close = function () {
                                            $uibModalInstance.dismiss("dismiss");
                                        };
                                        $scope.ok = function () { return __awaiter(_this, void 0, void 0, function () {
                                            var membersClient, re, name_1, phone, money, number, remark, whiteSpiritMoney, whiteSpiritNumber, cashMoney, resp, err_2;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 3, , 4]);
                                                        if ($scope.member.name === undefined) {
                                                            $swal.error({ title: "请填写会员名称!" });
                                                            return [2 /*return*/];
                                                        }
                                                        if ($scope.member.phone === undefined) {
                                                            $swal.error({ title: "请填写手机号!" });
                                                            return [2 /*return*/];
                                                        }
                                                        if ($scope.member.money === undefined) {
                                                            $swal.error({ title: "请填写啤酒预存金额!" });
                                                            return [2 /*return*/];
                                                        }
                                                        if ($scope.member.number === undefined) {
                                                            $swal.error({ title: "请填写啤酒预存数量!" });
                                                            return [2 /*return*/];
                                                        }
                                                        if ($scope.member.whiteSpiritMoney === undefined) {
                                                            $swal.error({ title: "请填写白酒预存金额!" });
                                                            return [2 /*return*/];
                                                        }
                                                        if ($scope.member.whiteSpiritNumber === undefined) {
                                                            $swal.error({ title: "请填写白酒预存数量!" });
                                                            return [2 /*return*/];
                                                        }
                                                        if ($scope.member.cashMoney === undefined) {
                                                            $swal.error({ title: "请填写现金金额!" });
                                                            return [2 /*return*/];
                                                        }
                                                        membersClient = this.api.getClient(webapi.MembersClient);
                                                        return [4 /*yield*/, membersClient.getMembersAll(1, 20, "", $scope.member.phone)];
                                                    case 1:
                                                        re = _a.sent();
                                                        if (re.errcode === 0) {
                                                            if (re.data.list.length > 0) {
                                                                $swal.error({ title: "会员信息已经存在，请更换手机号!" });
                                                                return [2 /*return*/];
                                                            }
                                                        }
                                                        else {
                                                            $swal.error({ title: "根据手机号判断会员是否存在异常,请联系管理员!" });
                                                            $uibModalInstance.close();
                                                            return [2 /*return*/];
                                                        }
                                                        name_1 = $scope.member.name;
                                                        phone = $scope.member.phone;
                                                        money = $scope.member.money;
                                                        number = $scope.member.number;
                                                        remark = $scope.member.remark;
                                                        whiteSpiritMoney = $scope.member.whiteSpiritMoney;
                                                        whiteSpiritNumber = $scope.member.whiteSpiritNumber;
                                                        cashMoney = $scope.member.cashMoney;
                                                        return [4 /*yield*/, membersClient.putInsertMembers(name_1, phone, money, number, remark, whiteSpiritMoney, whiteSpiritNumber, cashMoney)];
                                                    case 2:
                                                        resp = _a.sent();
                                                        if (resp.errcode === 0) {
                                                            this.pageChanged();
                                                            $notify.success("新增会员成功");
                                                            $uibModalInstance.close();
                                                        }
                                                        else {
                                                            $swal.error({ title: "新增异常,请联系管理员!" });
                                                            $uibModalInstance.close();
                                                        }
                                                        return [3 /*break*/, 4];
                                                    case 3:
                                                        err_2 = _a.sent();
                                                        console.error(err_2);
                                                        $swal.error({ title: "新增异常,请联系管理员!" });
                                                        return [3 /*break*/, 4];
                                                    case 4: return [2 /*return*/];
                                                }
                                            });
                                        }); };
                                        return [2 /*return*/];
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
                VisithistoryIndexCtrl.prototype.openMemberModal = function (l) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            this.$uibModal.open({
                                templateUrl: "memberTemplate.html",
                                controller: function ($scope, $uibModalInstance, $http, $q, $swal, $notify) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    var dictionariesClient, datatypeSource;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                dictionariesClient = this.api.getClient(webapi.DictionariesClient);
                                                return [4 /*yield*/, dictionariesClient.getDictionariesType(1, 3)];
                                            case 1:
                                                datatypeSource = _a.sent();
                                                $scope.id = l.id;
                                                $scope.typeList = datatypeSource.data.industrytypeList;
                                                $scope.member = {};
                                                $scope.member.name = l.name;
                                                $scope.member.phone = l.phone;
                                                $scope.member.money = l.money;
                                                $scope.member.number = l.number;
                                                $scope.member.type = lodash_1.default.find($scope.typeList, function (item) { return item.id === l.type; });
                                                $scope.member.remark = l.remark;
                                                $scope.member.whiteSpiritMoney = l.whiteSpiritMoney;
                                                $scope.member.whiteSpiritNumber = l.whiteSpiritNumber;
                                                $scope.member.cashMoney = l.cashMoney;
                                                $scope.close = function () {
                                                    $uibModalInstance.dismiss("dismiss");
                                                };
                                                $scope.ok = function () { return __awaiter(_this, void 0, void 0, function () {
                                                    var name_2, phone, money, number, remark, whiteSpiritMoney, whiteSpiritNumber, cashMoney, membersClient, resp, err_3;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                if ($scope.member.name === undefined) {
                                                                    $swal.error({ title: "请填写会员名称!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.member.phone === undefined) {
                                                                    $swal.error({ title: "请填写手机号!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.member.money === undefined) {
                                                                    $swal.error({ title: "请填写预存金额!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.member.number === undefined) {
                                                                    $swal.error({ title: "请填写预存数量!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                //if ($scope.member.type === undefined) {
                                                                //$swal.error({ title: "请填写存酒类别!" });
                                                                //return;
                                                                //}
                                                                if ($scope.member.whiteSpiritMoney === undefined) {
                                                                    $swal.error({ title: "请填写白酒预存金额!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.member.whiteSpiritNumber === undefined) {
                                                                    $swal.error({ title: "请填写白酒预存数量!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.member.cashMoney === undefined) {
                                                                    $swal.error({ title: "请填写现金金额!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                name_2 = $scope.member.name;
                                                                phone = $scope.member.phone;
                                                                money = $scope.member.money;
                                                                number = $scope.member.number;
                                                                remark = $scope.member.remark;
                                                                whiteSpiritMoney = $scope.member.whiteSpiritMoney;
                                                                whiteSpiritNumber = $scope.member.whiteSpiritNumber;
                                                                cashMoney = $scope.member.cashMoney;
                                                                membersClient = this.api.getClient(webapi.MembersClient);
                                                                return [4 /*yield*/, membersClient.putUpdateMembers($scope.id, name_2, phone, money, number, remark, whiteSpiritMoney, whiteSpiritNumber, cashMoney)];
                                                            case 1:
                                                                resp = _a.sent();
                                                                if (resp.errcode === 0) {
                                                                    this.pageChanged();
                                                                    this.$notify.success("会员更新成功");
                                                                    $uibModalInstance.close();
                                                                }
                                                                else {
                                                                    $swal.error({ title: "更新异常,请联系管理员!" });
                                                                    $uibModalInstance.close();
                                                                }
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                err_3 = _a.sent();
                                                                console.error(err_3);
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
                return VisithistoryIndexCtrl;
            }(base_1.default));
            exports_1("VisithistoryIndexCtrl", VisithistoryIndexCtrl);
        }
    };
});
//# sourceMappingURL=visithistory.index.js.map