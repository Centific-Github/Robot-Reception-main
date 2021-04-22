package cn.pactera.service.frontdesk.net.retrofit;



import io.reactivex.Observable;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

/**
 * draft  in 12, 2019
 */

public interface FrontDeskApiRepository {


      String APP_SERVER_URL="http://pactera.api/";

    /*
    *  services for visitor
    * It's used for making check in for the visitor
     */
    //@POST("visitorCheckin")
    //Observable<VisitorBean> visitorCheckin(@Body VisitorBean bean);


    /*
     * common services as logging error info
     */
   // @POST("post")
    //void sysLog(@Body LogBean bean);
}
