package cn.pactera.service.frontdesk.presenter;

/**
 * Created by chenxu.
 */

public interface IPresenter<V> {

    void attachView(V view);
    void detachView();
}
