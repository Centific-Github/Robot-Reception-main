export class ConfigBase {
    constructor() { }


    private _q: ng.IQService;

    get q(): ng.IQService {
        return this._q;
    }

    set q($q) {
        this._q = $q;
    }
}