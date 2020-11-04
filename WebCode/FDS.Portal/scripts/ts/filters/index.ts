import angular from "angular";
import _ from "lodash";
import enums from "../models/enums";
import division from "../models/division";

const appfilters: string = "app.filters";
export default appfilters;

angular.module(appfilters, [])
    .filter("displayBoolean", ["$i18next",
        ($i18next) => {
            return (value, cate) => {
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
        ($i18next) => {
            return (value, key) => {
                if (enums[key]) {
                    let e = enums[key];
                    let findE = _.find<any>(e, (v) => {
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
        () => {
            return (value) => {
                let province = _.find(division, ["code", value]);
                return province ? province.name : "";
            };
        }
    ])
    .filter("displayCity", [
        () => {
            return (value) => {
                let cities = _.flatMap(division, item => item.childs);
                let city = _.find(cities, ["code", value]);
                return city ? city.name : "";
            };
        }
    ])
    .filter("length", [
        () => {
            return (value: any, len: number) => {
                let str = value + "";
                if (str && str.length > len) {
                    return str.substr(0, len) + "...";
                } else {
                    return value;
                }
            }
        }
    ])
    ;