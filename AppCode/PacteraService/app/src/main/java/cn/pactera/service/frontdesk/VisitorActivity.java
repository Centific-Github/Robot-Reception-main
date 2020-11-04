package  cn.pactera.service.frontdesk;



import android.app.Activity;
import android.os.Bundle;
import android.widget.Toast;

import cn.pactera.service.frontdesk.presenter.VisitPresenter;
import  cn.pactera.service.frontdesk.ui.BaseActivity;

import cn.pactera.service.frontdesk.view.ICommonView;

public class VisitorActivity extends BaseActivity<VisitPresenter> implements ICommonView  {

    private VisitPresenter visitPresenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        visitPresenter = new VisitPresenter(this);
        visitPresenter.initView();
    }

    @Override
    public void showProgress() {

    }

    @Override
    public void hideProgress() {

    }

    @Override
    public void prompt(String info) {
        Toast.makeText(this, info, Toast.LENGTH_LONG).show();
    }

    @Override
    public Activity getActivity() {
        return this;
    }
}
