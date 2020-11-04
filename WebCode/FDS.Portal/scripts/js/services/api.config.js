System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ConfigBase;
    return {
        setters: [],
        execute: function () {
            ConfigBase = /** @class */ (function () {
                function ConfigBase() {
                }
                Object.defineProperty(ConfigBase.prototype, "q", {
                    get: function () {
                        return this._q;
                    },
                    set: function ($q) {
                        this._q = $q;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ConfigBase;
            }());
            exports_1("ConfigBase", ConfigBase);
        }
    };
});
//# sourceMappingURL=api.config.js.map