package cn.pactera.service.frontdesk.ui;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import cn.pactera.service.frontdesk.presenter.BasePresenter;


public abstract class BaseActivity<P extends BasePresenter> extends Activity {

    public Activity mActivity;
   // protected P mPresenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
     //   mPresenter = createPresenter();
        super.onCreate(savedInstanceState);

    }

 //   protected abstract P createPresenter();

    @Override
    public void setContentView(View view) {
        super.setContentView(view);
        mActivity=this;
    }

    public void toastShow(String content){
        Toast.makeText(mActivity, content, Toast.LENGTH_SHORT).show();
    }
}
