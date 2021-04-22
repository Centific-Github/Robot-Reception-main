System.register(["./base", "../models/enums", "../services/api", "lodash", "moment"], function (exports_1, context_1) {
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
    var base_1, enums_1, webapi, lodash_1, moment_1, HistoryIndexCtrl;
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
            },
            function (moment_1_1) {
                moment_1 = moment_1_1;
            }
        ],
        execute: function () {
            HistoryIndexCtrl = /** @class */ (function (_super) {
                __extends(HistoryIndexCtrl, _super);
                function HistoryIndexCtrl($scope, $http, $q, $swal, $timeout, $state, $stateParams, principal, $rootScope, $uibModal, $location, $urlService, $notify, $i18next, api, validateFileSize, Upload, $interval) {
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
                    _this.$interval = $interval;
                    _this.init();
                    return _this;
                }
                HistoryIndexCtrl.prototype.init = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope;
                        return __generator(this, function (_a) {
                            scope = this.$scope;
                            scope.query = {
                                pageIndex: 1,
                                pageSize: 15,
                                startTime: moment_1.default().add(-7, "days").toDate(),
                                endTime: moment_1.default().toDate(),
                                viewType: "list"
                            };
                            scope.search = this.search.bind(this);
                            this.getDeviceList();
                            return [2 /*return*/];
                        });
                    });
                };
                HistoryIndexCtrl.prototype.chartRender = function () {
                    var scope = this.$scope;
                    var list = scope.list;
                    list = lodash_1.default.sortBy(list, ["createTime"]);
                    lodash_1.default.forEach(list, function (item) {
                        item.createTime = moment_1.default(item.createTime).format("MM/DD hh:mm");
                    });
                    scope.labels = lodash_1.default.map(list, function (item) { return item.createTime; });
                    var series = lodash_1.default.map(enums_1.default.dataType, function (item) { return item.name; });
                    scope.series = series;
                    var data = [];
                    lodash_1.default.forEach(enums_1.default.dataType, function (v, k) {
                        data.push(lodash_1.default.map(list, function (item) { return item[k]; }));
                    });
                    scope.data = data;
                    scope.onClick = function (points, evt) {
                        //console.log(points, evt);
                    };
                    //scope.datasetOverride = [{ yAxisID: 'temperture' }, { yAxisID: 'humidity' }];
                    scope.options = {
                        legend: { display: true },
                        scales: {
                        //xAxes: [{
                        //    type: "time",
                        //    time: {
                        //        //unit:"day"
                        //        //displayFormats: {
                        //        //    quarter: 'MM/DD hh:mm'
                        //        //},
                        //        ticks: { source: "data" }
                        //    }
                        //}]
                        //yAxes: [
                        //    {
                        //        id: 'temperture',
                        //        type: 'linear',
                        //        display: true,
                        //        position: 'left'
                        //    },
                        //    {
                        //        id: 'humidity',
                        //        type: 'linear',
                        //        display: true,
                        //        position: 'right'
                        //    }
                        //]
                        }
                    };
                };
                HistoryIndexCtrl.prototype.getDeviceList = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, client, res, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    scope = this.$scope;
                                    client = this.api.getClient(webapi.DevicesClient);
                                    return [4 /*yield*/, client.getDevices(1, 100)];
                                case 1:
                                    res = _a.sent();
                                    scope.deviceList = res.data;
                                    if (res.data && res.data.length > 0) {
                                        scope.query.selectedDevice = res.data[0];
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_1 = _a.sent();
                                    this.processErrorResponse(err_1);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    });
                };
                HistoryIndexCtrl.prototype.getDeviceDataList = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, query, client, res, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    scope = this.$scope;
                                    query = scope.query;
                                    if (!query.selectedDevice || !query.selectedDevice.id) {
                                        return [2 /*return*/];
                                    }
                                    client = this.api.getClient(webapi.DeviceDatasClient);
                                    return [4 /*yield*/, client.queryDeviceData(query.selectedDevice.id, query.startTime, query.endTime, query.pageIndex, query.viewType == "list" ? query.pageSize : 1000)];
                                case 1:
                                    res = _a.sent();
                                    query.totalCount = res.totalCount;
                                    scope.list = res.data;
                                    if (query.viewType == "chart") {
                                        this.chartRender();
                                    }
                                    return [3 /*break*/, 3];
                                case 2:
                                    err_2 = _a.sent();
                                    this.processErrorResponse(err_2);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    });
                };
                HistoryIndexCtrl.prototype.search = function (timeRange) {
                    return __awaiter(this, void 0, void 0, function () {
                        var query;
                        return __generator(this, function (_a) {
                            query = this.$scope["query"];
                            switch (timeRange) {
                                case "1w":
                                    query.startTime = moment_1.default().add(-1, "weeks").toDate();
                                    break;
                                case "1m":
                                    query.startTime = moment_1.default().add(-1, "months").toDate();
                                    break;
                                case "1y":
                                    query.startTime = moment_1.default().add(-1, "years").toDate();
                                    break;
                                default:
                            }
                            if (timeRange) {
                                query.endTime = moment_1.default().toDate();
                            }
                            this.getDeviceDataList();
                            return [2 /*return*/];
                        });
                    });
                };
                return HistoryIndexCtrl;
            }(base_1.default));
            exports_1("HistoryIndexCtrl", HistoryIndexCtrl);
        }
    };
});
//# sourceMappingURL=history.js.map