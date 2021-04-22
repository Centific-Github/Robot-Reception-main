System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ApiBase;
    return {
        setters: [],
        execute: function () {
            ApiBase = /** @class */ (function () {
                function ApiBase(configBase) {
                    this.configBase = configBase;
                }
                ApiBase.prototype.transformOptions = function (options) {
                    //options.headers["rsdis-user-token"] = localStorage.getItem("token");
                    var deferred = this.configBase.q.defer();
                    deferred.resolve(options);
                    return deferred.promise;
                };
                return ApiBase;
            }());
            exports_1("ApiBase", ApiBase);
        }
    };
});
//# sourceMappingURL=api.base.js.map