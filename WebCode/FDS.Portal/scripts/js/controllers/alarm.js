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
    var base_1, webapi, moment_1, AlarmIndexCtrl;
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
            AlarmIndexCtrl = /** @class */ (function (_super) {
                __extends(AlarmIndexCtrl, _super);
                function AlarmIndexCtrl($scope, $http, $q, $swal, $timeout, $state, $stateParams, principal, $rootScope, $uibModal, $location, $urlService, $notify, $i18next, api, validateFileSize, Upload, $interval) {
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
                AlarmIndexCtrl.prototype.init = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope;
                        return __generator(this, function (_a) {
                            scope = this.$scope;
                            scope.query = {
                                pageIndex: 1,
                                pageSize: 15,
                                startTime: moment_1.default().add(-7, "days").toDate(),
                                endTime: moment_1.default().toDate()
                            };
                            scope.search = this.search.bind(this);
                            scope.deal = this.deal.bind(this);
                            this.getDeviceList();
                            this.search();
                            return [2 /*return*/];
                        });
                    });
                };
                AlarmIndexCtrl.prototype.getDeviceList = function () {
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
                AlarmIndexCtrl.prototype.getAlarmList = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, query, client, res, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    scope = this.$scope;
                                    query = scope.query;
                                    client = this.api.getClient(webapi.AlarmsClient);
                                    return [4 /*yield*/, client.getAlarms(query.pageIndex, query.pageSize, query.selectedDevice ? query.selectedDevice.id : undefined, query.startTime, query.endTime)];
                                case 1:
                                    res = _a.sent();
                                    scope.list = res.data;
                                    query.totalCount = res.totalCount;
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
                AlarmIndexCtrl.prototype.search = function (timeRange) {
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
                            this.getAlarmList();
                            return [2 /*return*/];
                        });
                    });
                };
                AlarmIndexCtrl.prototype.deal = function (alarm) {
                    return __awaiter(this, void 0, void 0, function () {
                        var _a, client, err_3;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.$swal.confirm("报警处理确认", "是否处理该报警?")];
                                case 1:
                                    _b.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    _a = _b.sent();
                                    return [2 /*return*/];
                                case 3:
                                    if (!alarm) {
                                        this.$notify.warn("没有选择所要处理的报警数据");
                                    }
                                    _b.label = 4;
                                case 4:
                                    _b.trys.push([4, 6, , 7]);
                                    client = this.api.getClient(webapi.AlarmsClient);
                                    return [4 /*yield*/, client.deal(alarm.id)];
                                case 5:
                                    _b.sent();
                                    this.$notify.success("处理报警成功");
                                    this.search();
                                    return [3 /*break*/, 7];
                                case 6:
                                    err_3 = _b.sent();
                                    this.processErrorResponse(err_3);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    });
                };
                return AlarmIndexCtrl;
            }(base_1.default));
            exports_1("AlarmIndexCtrl", AlarmIndexCtrl);
        }
    };
});
//# sourceMappingURL=alarm.js.map