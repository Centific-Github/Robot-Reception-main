import * as uirouter from "angular-ui-router";
import * as uib from "angular-ui-bootstrap";

export default class BaseCtrl {
    $$notify: any;
    $$i18next: any;
    lng: number;

    constructor(notify?: any, i18next?: any, scope?: any) {
        this.$$notify = notify;
        this.$$i18next = i18next;
        this.lng = i18next.i18n.language;
        scope.lng = this.lng;

        scope.$on("i18nextLanguageChange", () => {
            scope.lng = this.lng = this.$$i18next.i18n.language;

            if (!scope.$$phase) {
                scope.$digest();
            }
        });
    }

    processErrorResponse(err: any) {
        if (err.status === 400) {
            if (err.response) {
                let msg = JSON.parse(err.response);
                if (typeof msg === "object") {
                    msg.message && this.$$notify.warn(this.$$i18next.t(msg.message));
                }
                else {
                    console.error(err);
                    this.$$notify.warn(this.$$i18next.t("actionFailure"));
                }
            } else if (!err.response) {
                console.error(err);
                this.$$notify.warn(this.$$i18next.t("actionFailure"));
            }
        } else if (err.status === 500 || err.status === 404 || err.status === -1) {
            console.error(err);
            this.$$notify.error(this.$$i18next.t("remoteServerException"));
        } else if (err.status === 401) {
            this.$$notify.warn(this.$$i18next.t("noPermissionToAccess"));
        } else {
            console.error(err);
        }
    }
}