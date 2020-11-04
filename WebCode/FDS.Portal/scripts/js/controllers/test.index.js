System.register(["./base", "../models/enums"], function (exports_1, context_1) {
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
    var base_1, enums_1, TestIndexCtrl;
    return {
        setters: [
            function (base_1_1) {
                base_1 = base_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            }
        ],
        execute: function () {
            TestIndexCtrl = /** @class */ (function (_super) {
                __extends(TestIndexCtrl, _super);
                function TestIndexCtrl($scope, $http, $q, $swal, $timeout, $state, $stateParams, principal, $rootScope, $uibModal, $location, $urlService, $notify, $i18next, api, validateFileSize, Upload) {
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
                TestIndexCtrl.prototype.init = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope;
                        return __generator(this, function (_a) {
                            scope = this.$scope;
                            scope.query = {};
                            scope.pageIndex = 1;
                            scope.pageSize = 10;
                            scope.pageChanged = this.pageChanged.bind(this);
                            scope.showTestModel = this.showTestModel.bind(this);
                            scope.importTest = this.importTest.bind(this);
                            this.pageChanged();
                            return [2 /*return*/];
                        });
                    });
                };
                // #region 分页
                TestIndexCtrl.prototype.pageChanged = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, query, query_1, dataSource_1, err_1;
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
                                    dataSource_1 = [
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
                                    return [4 /*yield*/, this.$timeout(function () {
                                            var list = {
                                                data: dataSource_1.slice((scope.pageIndex - 1) * scope.pageSize, scope.pageIndex * scope.pageSize),
                                                totalCount: 20
                                            };
                                            scope.list = list.data;
                                            scope.totalCount = list.totalCount;
                                            query_1.loading = false;
                                        }, 1000)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_1 = _a.sent();
                                    console.error(err_1);
                                    this.$notify.error("获取日志列表失败");
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
                // #region showTestModel
                TestIndexCtrl.prototype.showTestModel = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            this.$uibModal.open({
                                templateUrl: "testTemplate.html",
                                controller: function ($scope, $uibModalInstance, $http, $q, $swal, $notify) {
                                    $scope.test = {};
                                    $scope.close = function () {
                                        $uibModalInstance.dismiss("dismiss");
                                    };
                                    $scope.ok = function () { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            try {
                                                $notify.success("新增用户成功");
                                                $uibModalInstance.close();
                                            }
                                            catch (err) {
                                                console.error(err);
                                                $swal.error({ title: "新增异常,请联系管理员!" });
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); };
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
                // #region 上传测试
                TestIndexCtrl.prototype.importTest = function (file) {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    debugger;
                                    if (!file)
                                        return [2 /*return*/];
                                    if (!this.validateFileSize(file, enums_1.default.fileSize.size500k.value))
                                        return [2 /*return*/];
                                    scope = this.$scope;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    scope.uploading = true;
                                    return [4 /*yield*/, this.$timeout(function () {
                                            scope.uploading = false;
                                        }, 2000)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_2 = _a.sent();
                                    console.error(err_2);
                                    this.$notify.error("error");
                                    return [3 /*break*/, 5];
                                case 4:
                                    scope.uploading = false;
                                    return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                return TestIndexCtrl;
            }(base_1.default));
            exports_1("TestIndexCtrl", TestIndexCtrl);
        }
    };
});
//# sourceMappingURL=test.index.js.map