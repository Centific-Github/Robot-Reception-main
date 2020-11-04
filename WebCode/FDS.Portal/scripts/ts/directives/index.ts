import angular from "angular";
import config from "../config";
import _ from "lodash";

const appdirectives: string = "app.directives";

export default appdirectives;

angular.module(appdirectives, [])
    .directive("stRoles", [
        () => {
            return {
                restrict: 'A',
                scope: false,
                link: function link(scope, elm, attrs: ng.IAttributes, ctrl, transclude) {
                    let roles: Array<string> = attrs["stRoles"].split(",");
                    scope.$on("st.setprincipal", (event, user) => {
                        let myRole = user.role.code;
                        if (roles.indexOf(myRole) === -1) {
                            elm.addClass("ng-hide");
                        } else {
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
        ($window, $state) => {
            return {
                restrict: 'E',
                scope: {
                    href: "="
                },
                template: `<a href="" class="btn-link" style="vertical-align: middle;text-decoration:none;"><i class="fa fa-chevron-left"></i> </a>`,
                link: (scope, elm, attrs: ng.IAttributes, ctrl, transclude) => {
                    elm.bind("click", () => {
                        if (attrs.href) {
                            $state.go(attrs.href);
                        } else {
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
        ($compile, $timeout) => {
            return {
                restrict: 'E',
                terminal: true,
                link: async (scope, element, attr) => {
                    if (attr.ngSrc) {
                        let domElem = '<script src="' + attr.ngSrc + '"></script>';
                        angular.element(element).append($compile(domElem)(scope));
                        //angular.element('body').append(domElem);
                    }
                }
            };
        }
    ])
    ;