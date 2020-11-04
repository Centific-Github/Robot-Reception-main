package cn.pactera.service.frontdesk.model;

import cn.pactera.service.frontdesk.net.retrofit.ApiClient;
import cn.pactera.service.frontdesk.net.retrofit.FrontDeskApiRepository;
import com.orhanobut.logger.AndroidLogAdapter;
import com.orhanobut.logger.Logger;




/**
 * draft  in 12, 2019
 *  init retrofit and create subscriptor
 */

public class CoreModel {
    //IMainPresenter mainPresenter;
    FrontDeskApiRepository service;

    public CoreModel(){
        service = ApiClient.retrofit().create(FrontDeskApiRepository.class);

        Logger.addLogAdapter(new AndroidLogAdapter());
    }

}
