export const appstates: Array<State> = [
    //#region test
    {
        name: "account",
        abstract: true,
        url: "/account",
        templateUrl: "tpl/layout.html"
    },
    {// Account management
        name: "account.index",
        url: "/index",
        templateUrl: "tpl/account/index.html",
        controller: "AccountIndexCtrl"
    },
    {
        name: "app",
        abstract: true,
        url: "/app",
        templateUrl: "tpl/layout.html"
    },
    {// App Authorization
        name: "app.index",
        url: "/index",
        templateUrl: "tpl/app/index.html",
        controller: "AppIndexCtrl"
    },
    {
        name: "contact",
        abstract: true,
        url: "/contact",
        templateUrl: "tpl/layout.html"
    },
    {// Contact maintanince
        name: "contact.index",
        url: "/index",
        templateUrl: "tpl/contact/index.html",
        controller: "ContactIndexCtrl"
    },
    {
        name: "visitreason",
        abstract: true,
        url: "/visitreason",
        templateUrl: "tpl/layout.html"
    },
    {// Visit Reason
        name: "visitreason.index",
        url: "/index",
        templateUrl: "tpl/visitreason/index.html",
        controller: "VisitreasonIndexCtrl"
    },
    {
        name: "visithistory",
        abstract: true,
        url: "/visithistory",
        templateUrl: "tpl/layout.html"
    },
    {// Visit History
        name: "visithistory.index",
        url: "/index",
        templateUrl: "tpl/visithistory/index.html",
        controller: "VisithistoryIndexCtrl"
    },
    {
        name: "deliver",
        abstract: true,
        url: "/deliver",
        templateUrl: "tpl/layout.html"
    },
    {// Deliver Contact
        name: "deliver.index",
        url: "/index",
        templateUrl: "tpl/deliver/index.html",
        controller: "DeliverIndexCtrl"
    },
    {
        name: "interview",
        abstract: true,
        url: "/interview",
        templateUrl: "tpl/layout.html"
    },
    {// Interview info
        name: "interview.index",
        url: "/index",
        templateUrl: "tpl/interview/index.html",
        controller: "InterviewIndexCtrl"
    },
    {
        name: "onboard",
        abstract: true,
        url: "/onboard",
        templateUrl: "tpl/layout.html"
    },
    {// Onboard info
        name: "onboard.index",
        url: "/index",
        templateUrl: "tpl/onboard/index.html",
        controller: "OnboardIndexCtrl"
    },


    {//会员管理
        name: "position.index",
        url: "/index",
        templateUrl: "tpl/position/index.html",
        controller: "PositionIndexCtrl"
    },
    {//会员消费记录管理
        name: "position.resumeIndex",
        url: "/resumeIndex",
        params: { id: null, fileName: null },
        templateUrl: "tpl/position/resumeIndex.html",
        controller: "ResumeIndexCtrl"
    },
    {
        name: "sys",
        abstract: true,
        url: "/sys",
        templateUrl: "tpl/layout.html"
    },
    {//新闻管理
        name: "sys.dictionary",
        url: "/dictionary",
        templateUrl: "tpl/sys/dictionary.html",
        controller: "SysDictionaryCtrl"
    },
    //#endregion
];

interface State {
    name: string;
    abstract?: boolean;
    url: string;
    params?: Object;
    template?: Function | string,
    templateUrl?: string;
    controller?: string;
    data?: Object;
}