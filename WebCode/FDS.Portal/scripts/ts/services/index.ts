import angular from "angular";
import config from "../config";
import swal from "sweetalert2";
import _ from "lodash";
import { ConfigBase } from "../services/api.config";
import * as uib from "angular-ui-bootstrap";
import enums from "../models/enums";

const appservices: string = "app.services";

export default appservices;

angular.module(appservices, [])
    .factory("principal", ["$http", "$q", "$notify", "$timeout", "$rootScope",
        ($http, $q, $notify, $timeout, $rootScope: ng.IRootScopeService) => {
            let setIdentity = async (token) => {
                localStorage.setItem("useraccount", token.account);
                localStorage.setItem("userid", token.id);
                localStorage.setItem("username", token.name);
                localStorage.setItem("userrole", token.role);
                await $timeout(1000);
                $rootScope.$broadcast("zgh.setprincipal");
            };

            let check = () => {
                return !!localStorage.getItem("userid");
            };

            let getId = () => {
                let userId = localStorage.getItem("userid");
                return userId;
            };

            let getAccount = () => {
                let account = localStorage.getItem("useraccount");
                return account;
            };

            let getRole = () => {
                let role = localStorage.getItem("userrole");
                return role;
            };

            let getName = () => {
                let name = localStorage.getItem("username");
                return name;
            };

            let isInit: boolean = false;
            let isInited = () => isInit;
            let setInit = () => {
                isInit = true;
            };
            let logout = () => {
                localStorage.clear();
            };

            return {
                setIdentity: setIdentity,
                id: getId,
                account: getAccount,
                role: getRole,
                name: getName,
                isAuthenticated: () => !!sessionStorage.getItem("userid"),
                setInit: setInit,
                isInited: isInited,
                check: check,
                logout:logout,
            };
        }
    ])
    .factory("api", ["$http", "$q", "principal",
        ($http: angular.IHttpService, $q: angular.IQService, principal) => {

            function createInstance<T>(c: new (p1, p2, p3, p4) => T): T {
                let configBase = new ConfigBase();
                configBase.q = $q;

                return new c(configBase, $http, $q, config.webapi);
            }

            return {
                getClient: createInstance,
            };
        }
    ])
    .factory("$swal", ["$http", "$q",
        () => {
            let success = (title, text, config: any) => {
                if (angular.isObject(title)) {
                    config = title;
                } else {
                    config = config || {};
                    config.title = title;
                    config.text = text;
                }

                swal({
                    title: config.title,
                    text: config.text,
                    type: "success",
                    timer: config.timer,
                    allowOutsideClick: config.allowOutsideClick,
                }).catch(swal.noop);
            };

            let error = (title, text, config: any) => {
                if (angular.isObject(title)) {
                    config = title;
                } else {
                    config = config || {};
                    config.title = title;
                    config.text = text;
                }

                swal({
                    title: config.title,
                    text: config.text,
                    type: "error",
                    timer: config.timer,
                    allowOutsideClick: config.allowOutsideClick,
                }).catch(swal.noop);
            };

            let warning = (title, text, config: any) => {
                if (angular.isObject(title)) {
                    config = title;
                } else {
                    config = config || {};
                    config.title = title;
                    config.text = text;
                }

                swal({
                    title: config.title,
                    text: config.text,
                    type: "warning",
                    timer: config.timer,
                    allowOutsideClick: config.allowOutsideClick,
                }).catch(swal.noop);
            };

            let info = (title, text, config: any) => {
                if (angular.isObject(title)) {
                    config = title;
                } else {
                    config = config || {};
                    config.title = title;
                    config.text = text;
                }

                swal({
                    title: config.title,
                    text: config.text,
                    type: "info",
                    timer: config.timer,
                    allowOutsideClick: config.allowOutsideClick,
                }).catch(swal.noop);
            };

            let question = (title, text, config: any) => {
                if (angular.isObject(title)) {
                    config = title;
                } else {
                    config = config || {};
                    config.title = title;
                    config.text = text;
                }

                swal({
                    title: config.title,
                    text: config.text,
                    type: "question",
                    timer: config.timer,
                    allowOutsideClick: config.allowOutsideClick,
                }).catch(swal.noop);
            };

            let confirm = (title, text, config: any): Promise<any> => {
                if (angular.isObject(title)) {
                    config = title;
                } else {
                    config = config || {};
                    config.title = title;
                    config.text = text;
                }

                return swal({
                    title: config.title,
                    text: config.text,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#8c8c8c",
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    allowOutsideClick: false,
                    showLoaderOnConfirm: !!config.preConfirm,
                    preConfirm: config.preConfirm,
                });
            };

            let close = () => {
                swal.close();
            };

            return {
                success: success,
                error: error,
                warning: warning,
                info: info,
                question: question,
                confirm: confirm,
                close: close,
                instance: swal,
            };
        }
    ])
    .factory("$notify", ['ngNotify',
        (ngNotify) => {
            let info = (title: string, config: any) => {
                config = config || {};
                ngNotify.set(title, { type: "info", duration: config.timer || 3000 });
            };

            let error = (title: string, config: any) => {
                config = config || {};
                ngNotify.set(title, { type: "error", duration: config.timer || 3000 });
            };

            let success = (title: string, config: any) => {
                config = config || {};
                ngNotify.set(title, { type: "success", duration: config.timer || 3000 });
            };

            let warn = (title: string, config: any) => {
                config = config || {};
                ngNotify.set(title, { type: "warn", duration: config.timer || 3000 });
            };

            let grimace = (title: string, config: any) => {
                config = config || {};
                ngNotify.set(title, { type: "grimace", duration: config.timer || 3000 });
            };

            return {
                info: info,
                error: error,
                success: success,
                warn: warn,
                grimace: grimace,
            };
        }
    ])
    .factory("validateFileSize", ["$notify",
        ($notify) => {
            return (file, size) => {
                if (file.size > size) {
                    $notify.warn(`导入的文件大小不能超过${size / 1024 / 1024}M`);
                    return false;
                }
                return true;
            };
        }
    ])
    .factory("tinymce", ["$i18next", "$uibModal",
        ($i18next, $uibModal) => {
            let init = (scope) => {
                scope.tinymceOption = config.tinymceBaseConfig;
                //scope.tinymceOption.setup = (editor) => {
                //    editor.addButton("mygallery", {
                //        text: $i18next.t("common.resourceLibrary"),
                //        icon: false,
                //        onclick: function () {
                //            $uibModal.open({
                //                templateUrl: "../../tpl/modal/resource.pick.html",
                //                controller: ResourcePickCtrl,
                //                resolve: {
                //                },
                //                size: "lg"
                //            }).result.then((resource) => {
                //                if (resource.fileType === enums.fileType.image.value) {
                //                    editor.insertContent(`<img src="${resource.fileUrlCn}" alt=""/>`);
                //                } else if (resource.fileType === enums.fileType.video.value) {
                //                    editor.insertContent(`<video src="${resource.fileUrlCn}"/>`);
                //                }
                //            }).catch(() => { });
                //        }
                //    });
                //}
            };

            return {
                init: init,
            };
        }
    ])
    ;