System.register(["angular"], function (exports_1, context_1) {
    "use strict";
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
    _this = this;
    var __moduleName = context_1 && context_1.id;
    var _this, angular_1, appdirectives;
    return {
        setters: [
            function (angular_1_1) {
                angular_1 = angular_1_1;
            }
        ],
        execute: function () {
            appdirectives = "app.directives";
            exports_1("default", appdirectives);
            angular_1.default.module(appdirectives, [])
                .directive("stRoles", [
                function () {
                    return {
                        restrict: 'A',
                        scope: false,
                        link: function link(scope, elm, attrs, ctrl, transclude) {
                            var roles = attrs["stRoles"].split(",");
                            scope.$on("st.setprincipal", function (event, user) {
                                var myRole = user.role.code;
                                if (roles.indexOf(myRole) === -1) {
                                    elm.addClass("ng-hide");
                                }
                                else {
                                    elm.addClass("ng-show");
                                }
                            });
                        },
                        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                            }]
                    };
                }
            ])
                .directive("backButton", ["$window", "$state",
                function ($window, $state) {
                    return {
                        restrict: 'E',
                        scope: {
                            href: "="
                        },
                        template: "<a href=\"\" class=\"btn-link\" style=\"vertical-align: middle;text-decoration:none;\"><i class=\"fa fa-chevron-left\"></i> </a>",
                        link: function (scope, elm, attrs, ctrl, transclude) {
                            elm.bind("click", function () {
                                if (attrs.href) {
                                    $state.go(attrs.href);
                                }
                                else {
                                    $window.history.back();
                                }
                            });
                            //elm.addClass("back-button");
                        },
                        controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                            }]
                    };
                }
            ])
                .directive("script", ["$compile", "$timeout",
                function ($compile, $timeout) {
                    return {
                        restrict: 'E',
                        terminal: true,
                        link: function (scope, element, attr) { return __awaiter(_this, void 0, void 0, function () {
                            var domElem;
                            return __generator(this, function (_a) {
                                if (attr.ngSrc) {
                                    domElem = '<script src="' + attr.ngSrc + '"></script>';
                                    angular_1.default.element(element).append($compile(domElem)(scope));
                                    //angular.element('body').append(domElem);
                                }
                                return [2 /*return*/];
                            });
                        }); }
                    };
                }
            ]);
        }
    };
});
//# sourceMappingURL=index.js.map