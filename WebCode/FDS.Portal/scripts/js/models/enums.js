System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var enums;
    return {
        setters: [],
        execute: function () {
            enums = {
                language: {
                    zh_cn: {
                        value: "zh-CN",
                        resKey: "cn",
                    },
                    en: {
                        value: "en",
                        resKey: "en",
                    }
                },
                fileType: {
                    video: {
                        value: 2,
                        resKey: "video",
                        contentType: "video/mp4",
                        container: "video"
                    },
                    pdf: {
                        value: 3,
                        resKey: "pdf",
                        contentType: "application/pdf",
                        container: "doc"
                    }
                },
                fileSize: {
                    size100k: {
                        value: 100 * 1024
                    },
                    size200k: {
                        value: 200 * 1024
                    },
                    size500k: {
                        value: 500 * 1024
                    },
                    size2m: {
                        value: 2 * 1024 * 1024
                    },
                    size4m: {
                        value: 4 * 1024 * 1024
                    },
                    size10m: {
                        value: 10 * 1024 * 1024
                    },
                    size20m: {
                        value: 20 * 1024 * 1024
                    },
                    size50m: {
                        value: 50 * 1024 * 1024
                    },
                    size100m: {
                        value: 100 * 1024 * 1024
                    },
                    size200m: {
                        value: 200 * 1024 * 1024
                    },
                    size300m: {
                        value: 300 * 1024 * 1024
                    },
                    size500m: {
                        value: 500 * 1024 * 1024
                    },
                },
                dataType: {
                    temperture: { value: 1, unit: "℃", name: "温度" },
                    humidity: { value: 2, unit: "%", name: "湿度" },
                    resistanceRatio: { value: 3, unit: "", name: "电阻比值" },
                    corrosionRate: { value: 4, unit: "μm/a", name: "腐蚀速率" },
                    corrosionMargin: { value: 5, unit: "μm", name: "腐蚀余量" },
                    corrosionAmount: { value: 6, unit: "μm", name: "已腐蚀量" },
                    corrosionLevel: { value: 7, unit: "", name: "腐蚀等级" },
                    pressure: { value: 8, unit: "mbar", name: "大气压强" },
                },
                alarmLevel: {
                    normal: { value: 1, name: "提示" },
                    general: { value: 2, name: "一般" },
                    serious: { value: 3, name: "严重" },
                    fatal: { value: 4, name: "致命" },
                }
            };
            exports_1("default", enums);
        }
    };
});
//# sourceMappingURL=enums.js.map