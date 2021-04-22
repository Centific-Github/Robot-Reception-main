package cn.pactera.service.frontdesk.view;

import android.app.Activity;


/**
 * draft  in 12, 2019
 */


public interface ICommonView {

    void showProgress();
    void hideProgress();
    void prompt(String info);
    Activity getActivity();
}
