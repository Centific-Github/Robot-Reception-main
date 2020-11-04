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
    var base_1, webapi, lodash_1, MonitorIndexCtrl;
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
            MonitorIndexCtrl = /** @class */ (function (_super) {
                __extends(MonitorIndexCtrl, _super);
                function MonitorIndexCtrl($scope, $http, $q, $swal, $timeout, $state, $stateParams, principal, $rootScope, $uibModal, $location, $urlService, $notify, $i18next, api, validateFileSize, Upload, $interval) {
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
                MonitorIndexCtrl.prototype.init = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope;
                        return __generator(this, function (_a) {
                            scope = this.$scope;
                            scope.query = {};
                            this.getZoneList();
                            return [2 /*return*/];
                        });
                    });
                };
                MonitorIndexCtrl.prototype.getZoneList = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, client, list, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    scope = this.$scope;
                                    client = this.api.getClient(webapi.ZonesClient);
                                    return [4 /*yield*/, client.getAllZones()];
                                case 1:
                                    list = _a.sent();
                                    scope.zoneList = list;
                                    this.getRealtimeData();
                                    this.$interval(this.getRealtimeData.bind(this), 5 * 1000);
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
                MonitorIndexCtrl.prototype.getRealtimeData = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var scope, client, list_1, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    scope = this.$scope;
                                    client = this.api.getClient(webapi.DeviceDatasClient);
                                    return [4 /*yield*/, client.getAllRealtimeData()];
                                case 1:
                                    list_1 = _a.sent();
                                    // let groupList = _.groupBy(list, "deviceId");
                                    lodash_1.default.each(scope.zoneList, function (zone) {
                                        lodash_1.default.each(zone.devices, function (device) {
                                            var datas = lodash_1.default.filter(list_1, { deviceId: device.id });
                                            device.dataList = datas;
                                        });
                                    });
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
                return MonitorIndexCtrl;
            }(base_1.default));
            exports_1("MonitorIndexCtrl", MonitorIndexCtrl);
        }
    };
});
//# sourceMappingURL=monitor.js.map