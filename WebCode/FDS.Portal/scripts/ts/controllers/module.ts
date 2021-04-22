import angular from "angular";
import { MainCtrl } from "./main";
import { TestIndexCtrl } from "./test.index";
import { PositionIndexCtrl } from "./position.index";
import { SysDictionaryCtrl } from "./sys.dictionary";
import { ResumeIndexCtrl } from "./position.resumeIndex";

import { AccountIndexCtrl } from "./account.index";
import { AppIndexCtrl } from "./app.index";
import { ContactIndexCtrl } from "./contact.index"
import { VisitreasonIndexCtrl } from "./visitreason.index"
import { VisithistoryIndexCtrl } from "./visithistory.index"
import { DeliverIndexCtrl } from "./deliver.index"
import { InterviewIndexCtrl } from "./interview.index"
import { OnboardIndexCtrl } from "./onboard.index"

const appcontroller: string = "app.controller";
export default appcontroller;

angular.module(appcontroller, [])
    .controller("MainCtrl", MainCtrl)
    .controller("TestIndexCtrl", TestIndexCtrl)
    .controller("PositionIndexCtrl", PositionIndexCtrl)
    .controller("SysDictionaryCtrl", SysDictionaryCtrl)
    .controller("ResumeIndexCtrl", ResumeIndexCtrl)
    .controller("AccountIndexCtrl", AccountIndexCtrl)
    .controller("AppIndexCtrl", AppIndexCtrl)
    .controller("ContactIndexCtrl", ContactIndexCtrl)
    .controller("VisitreasonIndexCtrl", VisitreasonIndexCtrl)
    .controller("VisithistoryIndexCtrl", VisithistoryIndexCtrl)
    .controller("DeliverIndexCtrl", DeliverIndexCtrl)
    .controller("InterviewIndexCtrl", InterviewIndexCtrl)
    .controller("OnboardIndexCtrl", OnboardIndexCtrl)
    ;
