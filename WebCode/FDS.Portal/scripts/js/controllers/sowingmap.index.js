System.register(["../config", "./base", "../models/enums", "../services/api"], function (exports_1, context_1) {
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
    var config_1, base_1, enums_1, webapi, SowingmapIndexCtrl;
    return {
        setters: [
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (base_1_1) {
                base_1 = base_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (webapi_1) {
                webapi = webapi_1;
            }
        ],
        execute: function () {
            SowingmapIndexCtrl = /** @class */ (function (_super) {
                __extends(SowingmapIndexCtrl, _super);
                function SowingmapIndexCtrl($scope, $http, $q, $swal, $timeout, $state, $stateParams, principal, $rootScope, $uibModal, $location, $urlService, $notify, $i18next, api, validateFileSize, Upload) {
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
                SowingmapIndexCtrl.prototype.init = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope;
                        return __generator(this, function (_a) {
                            scope = this.$scope;
                            scope.query = {};
                            scope.importFile1 = this.importFile1.bind(this);
                            scope.importFile2 = this.importFile2.bind(this);
                            scope.importFile3 = this.importFile3.bind(this);
                            scope.ok = this.ok.bind(this);
                            scope.pageChanged = this.pageChanged.bind(this);
                            this.pageChanged();
                            return [2 /*return*/];
                        });
                    });
                };
                // #region 查询轮播图
                SowingmapIndexCtrl.prototype.pageChanged = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, query, homeMapsClient, dataSource, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    scope = this.$scope;
                                    query = scope.query;
                                    query.loading = true;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    homeMapsClient = this.api.getClient(webapi.HomeMapsClient);
                                    return [4 /*yield*/, homeMapsClient.getHomeMapThree(1, 3)];
                                case 2:
                                    dataSource = _a.sent();
                                    scope.filePath1 = dataSource.data[0]["imgAddress"];
                                    scope.filePath2 = dataSource.data[1]["imgAddress"];
                                    scope.filePath3 = dataSource.data[2]["imgAddress"];
                                    scope.filePath1Url = dataSource.data[0]["redirectUrl"];
                                    scope.filePath2Url = dataSource.data[1]["redirectUrl"];
                                    scope.filePath3Url = dataSource.data[2]["redirectUrl"];
                                    scope.list = dataSource.data.list;
                                    scope.totalCount = dataSource.data.totalCount;
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_1 = _a.sent();
                                    console.error(err_1);
                                    this.$notify.error("获取轮播图失败");
                                    return [3 /*break*/, 5];
                                case 4:
                                    query.loading = false;
                                    return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                // #endregion 
                // #region 上传图片1
                SowingmapIndexCtrl.prototype.importFile1 = function (file) {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!file)
                                        return [2 /*return*/];
                                    if (!this.validateFileSize(file, enums_1.default.fileSize.size500k.value))
                                        return [2 /*return*/];
                                    scope = this.$scope;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    scope.uploading = true;
                                    scope.filePath1 = file.name;
                                    scope.file1 = file;
                                    return [4 /*yield*/, this.$timeout(function () {
                                            scope.uploading = false;
                                        }, 1000)];
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
                // #endregion
                // #region 上传图片2
                SowingmapIndexCtrl.prototype.importFile2 = function (file) {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, err_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!file)
                                        return [2 /*return*/];
                                    if (!this.validateFileSize(file, enums_1.default.fileSize.size500k.value))
                                        return [2 /*return*/];
                                    scope = this.$scope;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    scope.uploading1 = true;
                                    scope.filePath2 = file.name;
                                    scope.file2 = file;
                                    return [4 /*yield*/, this.$timeout(function () {
                                            scope.uploading1 = false;
                                        }, 1000)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_3 = _a.sent();
                                    console.error(err_3);
                                    this.$notify.error("error");
                                    return [3 /*break*/, 5];
                                case 4:
                                    scope.uploading1 = false;
                                    return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                // #endregion
                // #region 上传图片3
                SowingmapIndexCtrl.prototype.importFile3 = function (file) {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, err_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!file)
                                        return [2 /*return*/];
                                    if (!this.validateFileSize(file, enums_1.default.fileSize.size500k.value))
                                        return [2 /*return*/];
                                    scope = this.$scope;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    scope.uploading2 = true;
                                    scope.filePath3 = file.name;
                                    scope.file3 = file;
                                    return [4 /*yield*/, this.$timeout(function () {
                                            scope.uploading2 = false;
                                        }, 1000)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_4 = _a.sent();
                                    console.error(err_4);
                                    this.$notify.error("error");
                                    return [3 /*break*/, 5];
                                case 4:
                                    scope.uploading2 = false;
                                    return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                // #endregion
                // #region 保存
                SowingmapIndexCtrl.prototype.ok = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, formData, file1, file2, file3, resp, err_5;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    scope = this.$scope;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, 4, 5]);
                                    formData = new FormData();
                                    file1 = void 0;
                                    file2 = void 0;
                                    file3 = void 0;
                                    if (scope.file1 != undefined) {
                                        file1 = scope.file1;
                                    }
                                    if (scope.file2 != undefined) {
                                        file2 = scope.file2;
                                    }
                                    if (scope.file3 != undefined) {
                                        file3 = scope.file3;
                                    }
                                    return [4 /*yield*/, this.Upload.upload({
                                            method: "POST",
                                            url: config_1.default.webapi + "/api/HomeMaps/UploadImgFiles?url1=" + scope.filePath1Url + "&url2=" + scope.filePath2Url + "&url3=" + scope.filePath3Url,
                                            data: { file: file1, file1: file2, file2: file3 },
                                        })];
                                case 2:
                                    resp = _a.sent();
                                    if (resp.status === 200) {
                                        this.$notify.success("轮播图修改成功!");
                                    }
                                    return [3 /*break*/, 5];
                                case 3:
                                    err_5 = _a.sent();
                                    console.error(err_5);
                                    this.$notify.error("error");
                                    return [3 /*break*/, 5];
                                case 4:
                                    scope.uploading2 = false;
                                    return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                };
                return SowingmapIndexCtrl;
            }(base_1.default));
            exports_1("SowingmapIndexCtrl", SowingmapIndexCtrl);
        }
    };
});
//# sourceMappingURL=sowingmap.index.js.map