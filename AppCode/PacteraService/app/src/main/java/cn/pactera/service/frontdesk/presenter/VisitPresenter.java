package cn.pactera.service.frontdesk.presenter;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


import cn.pactera.service.frontdesk.R;
import  cn.pactera.service.frontdesk.view.ICommonView;


/**
 * Created by chenxu
 */

public class VisitPresenter extends  BasePresenter<ICommonView> implements  View.OnClickListener{

    private ICommonView iMainView;
  //  private VisitorModel visitorModel;

    private Activity mainActivity;
    private ViewGroup mMainView;


    public VisitPresenter(ICommonView iView){
        //mainActivity = activity;


        iMainView=iView;

    }

    public ViewGroup getMainView(){
        return mMainView;
    }

    public void initView(){

        mainActivity=iMainView.getActivity();
        mMainView = (ViewGroup) LayoutInflater.from(mainActivity).inflate(R.layout.activity_visitor,null);

        mainActivity.setContentView(mMainView);

    }

    @Override
    public void attachView(ICommonView view) {
      //  this.mMainView=view;
    }

    @Override
    public void detachView() {

      //  this.mMainView=null;
    }

    void showProgress(){

        //progressBar.setVisibility(View.VISIBLE);
    }
    void hideProgress(){
        //progressBar.setVisibility(View.GONE);
    }


    @Override
    public void onClick(View view) {

    }


}
