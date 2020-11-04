System.register(["./base", "../models/enums", "../services/api", "lodash"], function (exports_1, context_1) {
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
    var base_1, enums_1, webapi, lodash_1, NewIndexCtrl;
    return {
        setters: [
            function (base_1_1) {
                base_1 = base_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (webapi_1) {
                webapi = webapi_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            }
        ],
        execute: function () {
            NewIndexCtrl = /** @class */ (function (_super) {
                __extends(NewIndexCtrl, _super);
                function NewIndexCtrl($scope, $http, $q, $swal, $timeout, $state, $stateParams, principal, $rootScope, $uibModal, $location, $urlService, $notify, $i18next, api, validateFileSize, Upload) {
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
                NewIndexCtrl.prototype.init = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope;
                        return __generator(this, function (_a) {
                            scope = this.$scope;
                            scope.query = {};
                            scope.pageIndex = 1;
                            scope.pageSize = 20;
                            scope.pageChanged = this.pageChanged.bind(this);
                            scope.showTestModel = this.showTestModel.bind(this);
                            scope.openNewModel = this.openNewModel.bind(this);
                            scope.release = this.release.bind(this);
                            this.pageChanged();
                            return [2 /*return*/];
                        });
                    });
                };
                // #region 分页
                NewIndexCtrl.prototype.pageChanged = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, query, query_1, newsClient, dataSource, err_1;
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
                                    newsClient = this.api.getClient(webapi.NewsClient);
                                    return [4 /*yield*/, newsClient.getNewAllList(scope.pageIndex, scope.pageSize, query_1.startTime, query_1.endTime, query_1.titleName)];
                                case 2:
                                    dataSource = _a.sent();
                                    scope.list = dataSource.data.list;
                                    scope.totalCount = dataSource.data.totalCount;
                                    query_1.loading = false;
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
                NewIndexCtrl.prototype.showTestModel = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            this.$uibModal.open({
                                templateUrl: "testTemplate.html",
                                controller: function ($scope, $uibModalInstance, $http, $q, $swal, $notify) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    var dictionariesClient, datatypeSource;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                dictionariesClient = this.api.getClient(webapi.DictionariesClient);
                                                return [4 /*yield*/, dictionariesClient.getDictionariesNewTypeAll(0, 1)];
                                            case 1:
                                                datatypeSource = _a.sent();
                                                $scope.industrytypeList = datatypeSource.data.industrytypeList;
                                                $scope.newlist = datatypeSource.data;
                                                $scope.new = {};
                                                $scope.close = function () {
                                                    $uibModalInstance.dismiss("dismiss");
                                                };
                                                $scope.ok = function () { return __awaiter(_this, void 0, void 0, function () {
                                                    var title, type, content, fileSmall, filebig, newsClient, resp, err_2;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                if ($scope.new.title === undefined) {
                                                                    $swal.error({ title: "请填写新闻标题!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.new.type === undefined) {
                                                                    $swal.error({ title: "请选择新闻类别!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.new.content === undefined) {
                                                                    $swal.error({ title: "请填写新闻内容!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.new.fileSmall === undefined) {
                                                                    $swal.error({ title: "请填写小图片地址!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.new.filebig === undefined) {
                                                                    $swal.error({ title: "请填写大图片地址!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                title = $scope.new.title;
                                                                type = $scope.new.type.id;
                                                                content = $scope.new.content;
                                                                fileSmall = $scope.new.fileSmall;
                                                                filebig = $scope.new.filebig;
                                                                newsClient = this.api.getClient(webapi.NewsClient);
                                                                return [4 /*yield*/, newsClient.putNews(title, type, content, fileSmall, filebig)];
                                                            case 1:
                                                                resp = _a.sent();
                                                                if (resp.errcode === 0) {
                                                                    this.
                                                                        $notify.success("新增成功");
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
                                                // #region 上传小图片
                                                $scope.importFileSmall = function (file) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        if (!file)
                                                            return [2 /*return*/];
                                                        if (!this.validateFileSize(file, enums_1.default.fileSize.size500k.value))
                                                            return [2 /*return*/];
                                                        try {
                                                            $scope.fileSmall = file.name;
                                                            $scope.file = file;
                                                        }
                                                        catch (err) {
                                                            console.error(err);
                                                            $notify.error("error");
                                                        }
                                                        finally {
                                                        }
                                                        return [2 /*return*/];
                                                    });
                                                }); };
                                                // #endregion
                                                // #region 上传大图片
                                                $scope.importFileBig = function (file) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        if (!file)
                                                            return [2 /*return*/];
                                                        if (!this.validateFileSize(file, enums_1.default.fileSize.size500k.value))
                                                            return [2 /*return*/];
                                                        try {
                                                            $scope.filebig = file.name;
                                                            $scope.fileb = file;
                                                        }
                                                        catch (err) {
                                                            console.error(err);
                                                            $notify.error("error");
                                                        }
                                                        finally {
                                                        }
                                                        return [2 /*return*/];
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
                // #region openNewModel
                NewIndexCtrl.prototype.openNewModel = function (l) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            this.$uibModal.open({
                                templateUrl: "newTemplate.html",
                                controller: function ($scope, $uibModalInstance, $http, $q, $swal, $notify) { return __awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    var dictionariesClient, datatypeSource;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                dictionariesClient = this.api.getClient(webapi.DictionariesClient);
                                                return [4 /*yield*/, dictionariesClient.getDictionariesNewTypeAll(0, 1)];
                                            case 1:
                                                datatypeSource = _a.sent();
                                                $scope.industrytypeList = datatypeSource.data.industrytypeList;
                                                $scope.newlist = datatypeSource.data;
                                                $scope.new = {};
                                                $scope.new.id = l.id;
                                                $scope.new.title = l.title;
                                                $scope.new.type = lodash_1.default.find($scope.newlist, function (item) { return item.id === l.type; });
                                                $scope.new.content = l.content;
                                                $scope.new.fileSmall = l.smallImgAddress;
                                                $scope.new.filebig = l.bigImgAddress;
                                                $scope.close = function () {
                                                    $uibModalInstance.dismiss("dismiss");
                                                };
                                                $scope.ok = function () { return __awaiter(_this, void 0, void 0, function () {
                                                    var title, type, content, fileSmall, filebig, newsClient, resp, err_3;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                _a.trys.push([0, 2, , 3]);
                                                                if ($scope.new.title === undefined) {
                                                                    $swal.error({ title: "请填写新闻标题!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.new.type === undefined) {
                                                                    $swal.error({ title: "请选择新闻类别!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.new.content === undefined) {
                                                                    $swal.error({ title: "请填写新闻内容!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.new.fileSmall === undefined) {
                                                                    $swal.error({ title: "请填写小图片地址!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                if ($scope.new.filebig === undefined) {
                                                                    $swal.error({ title: "请填写大图片地址!" });
                                                                    return [2 /*return*/];
                                                                }
                                                                title = $scope.new.title;
                                                                type = $scope.new.type.id;
                                                                content = $scope.new.content;
                                                                fileSmall = $scope.new.fileSmall;
                                                                filebig = $scope.new.filebig;
                                                                newsClient = this.api.getClient(webapi.NewsClient);
                                                                return [4 /*yield*/, newsClient.updateNews($scope.new.id, title, type, content, fileSmall, filebig)];
                                                            case 1:
                                                                resp = _a.sent();
                                                                if (resp.errcode === 0) {
                                                                    this.
                                                                        $notify.success("更新成功");
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
                                                                $swal.error({ title: "更新异常,请联系管理员!" });
                                                                return [3 /*break*/, 3];
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); };
                                                // #region 上传小图片
                                                $scope.importFileSmall = function (file) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        if (!file)
                                                            return [2 /*return*/];
                                                        if (!this.validateFileSize(file, enums_1.default.fileSize.size500k.value))
                                                            return [2 /*return*/];
                                                        try {
                                                            $scope.fileSmall = file.name;
                                                            $scope.file = file;
                                                        }
                                                        catch (err) {
                                                            console.error(err);
                                                            $notify.error("error");
                                                        }
                                                        finally {
                                                        }
                                                        return [2 /*return*/];
                                                    });
                                                }); };
                                                // #endregion
                                                // #region 上传大图片
                                                $scope.importFileBig = function (file) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        if (!file)
                                                            return [2 /*return*/];
                                                        if (!this.validateFileSize(file, enums_1.default.fileSize.size500k.value))
                                                            return [2 /*return*/];
                                                        try {
                                                            $scope.filebig = file.name;
                                                            $scope.fileb = file;
                                                        }
                                                        catch (err) {
                                                            console.error(err);
                                                            $notify.error("error");
                                                        }
                                                        finally {
                                                        }
                                                        return [2 /*return*/];
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
                //#region 发布
                NewIndexCtrl.prototype.release = function (id) {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, newsClient, resp, err_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    scope = this.$scope;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    newsClient = this.api.getClient(webapi.NewsClient);
                                    return [4 /*yield*/, newsClient.releaseNews(id)];
                                case 2:
                                    resp = _a.sent();
                                    if (resp.errcode === 0) {
                                        this.pageChanged();
                                        this.$notify.success("发布成功");
                                    }
                                    else {
                                        this.$notify.error({ title: "发布失败,请联系管理员!" });
                                    }
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_4 = _a.sent();
                                    console.error(err_4);
                                    this.$notify.error("发布失败");
                                    return [3 /*break*/, 5];
                                case 4: return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                return NewIndexCtrl;
            }(base_1.default));
            exports_1("NewIndexCtrl", NewIndexCtrl);
        }
    };
});
//# sourceMappingURL=new.index.js.map