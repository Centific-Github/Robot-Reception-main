import ng from "angular";
//import {ApiBase} from "./api.base";
import { ConfigBase } from "./api.config";

export class ApiBase {

    constructor(
        private configBase: ConfigBase,
    ) {

    }

    transformOptions(options: ng.IRequestConfig): ng.IPromise<any> {
        //options.headers["rsdis-user-token"] = localStorage.getItem("token");

        let deferred = this.configBase.q.defer();
        deferred.resolve(options);

        return deferred.promise;
    }
}