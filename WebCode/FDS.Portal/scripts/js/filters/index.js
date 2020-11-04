System.register(["angular", "lodash", "../models/enums", "../models/division"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var angular_1, lodash_1, enums_1, division_1, appfilters;
    return {
        setters: [
            function (angular_1_1) {
                angular_1 = angular_1_1;
            },
            function (lodash_1_1) {
                lodash_1 = lodash_1_1;
            },
            function (enums_1_1) {
                enums_1 = enums_1_1;
            },
            function (division_1_1) {
                division_1 = division_1_1;
            }
        ],
        execute: function () {
            appfilters = "app.filters";
            exports_1("default", appfilters);
            angular_1.default.module(appfilters, [])
                .filter("displayBoolean", ["$i18next",
                function ($i18next) {
                    return function (value, cate) {
                        if (cate === "yesorno")
                            return value ? $i18next.t("yes") : $i18next.t("no");
                        else if (cate === "haveorno")
                            return value ? $i18next.t("have") : $i18next.t("no2");
                        else if (cate === "validornot")
                            return value ? $i18next.t("valid") : $i18next.t("invalid");
                        else if (cate === "subscribe")
                            return value ? $i18next.t("subscribed") : $i18next.t("unsubscribed");
                        else if (cate === "use")
                            return value ? $i18next.t("used") : $i18next.t("unused");
                        else if (cate === "gender")
                            return value === 1 ? $i18next.t("male") : (value === 0 ? $i18next.t("female") : "");
                        else if (cate === "active")
                            return value ? $i18next.t("active") : $i18next.t("inactive");
                        else
                            return value;
                    };
                }
            ])
                .filter("displayEnum", ["$i18next",
                function ($i18next) {
                    return function (value, key) {
                        if (enums_1.default[key]) {
                            var e = enums_1.default[key];
                            var findE = lodash_1.default.find(e, function (v) {
                                return (v.value + "") == (value + "");
                            });
                            if (findE) {
                                return findE.resKey ? $i18next.t(findE.resKey) : findE.name;
                            }
                        }
                        return "";
                    };
                }
            ])
                .filter("displayProvince", [
                function () {
                    return function (value) {
                        var province = lodash_1.default.find(division_1.default, ["code", value]);
                        return province ? province.name : "";
                    };
                }
            ])
                .filter("displayCity", [
                function () {
                    return function (value) {
                        var cities = lodash_1.default.flatMap(division_1.default, function (item) { return item.childs; });
                        var city = lodash_1.default.find(cities, ["code", value]);
                        return city ? city.name : "";
                    };
                }
            ])
                .filter("length", [
                function () {
                    return function (value, len) {
                        var str = value + "";
                        if (str && str.length > len) {
                            return str.substr(0, len) + "...";
                        }
                        else {
                            return value;
                        }
                    };
                }
            ]);
        }
    };
});
//# sourceMappingURL=index.js.map