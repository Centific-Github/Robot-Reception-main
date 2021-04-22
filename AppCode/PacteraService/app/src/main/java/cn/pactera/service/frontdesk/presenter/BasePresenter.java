package cn.pactera.service.frontdesk.presenter;

import io.reactivex.Observable;
import io.reactivex.Observer;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.CompositeDisposable;
import io.reactivex.schedulers.Schedulers;


/**
 * Created by chenxu
 */

public class BasePresenter<V> implements IPresenter<V> {

    CompositeDisposable compositeDisposable;

    @Override
    public void attachView(V view) {

    }

    @Override
    public void detachView() {

    }


public void addSubscription(Observable observable, Observer subscriber){

    if (null == compositeDisposable) {
        compositeDisposable = new CompositeDisposable();
    }
   observable.subscribeOn(Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe(subscriber);

}


   public void unSubscribe(){
       if (null != compositeDisposable) {
           compositeDisposable.clear();
       }
   }

}
