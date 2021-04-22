package cn.pactera.service.frontdesk.net.retrofit;

//import com.example.myapplication.BuildConfig;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.jakewharton.retrofit2.adapter.rxjava2.RxJava2CallAdapterFactory;

import java.lang.reflect.Type;
import java.util.Calendar;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * draft  in 12, 2019
 */
public class  ApiClient {

    private static class LazyHolder {
        private LazyHolder() {
        }

        private static Retrofit INSTANCE = new ApiClient().retrofitBuild();
    }

    public static Retrofit mRetrofit;

    public static final Retrofit retrofit() {
        return LazyHolder.INSTANCE;
    }

    private Retrofit retrofitBuild() {
        if (mRetrofit == null) {
            OkHttpClient.Builder builder = new OkHttpClient.Builder();

           // if (BuildConfig.DEBUG) {
                //log interceptor
                HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
                loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
                builder.addInterceptor(loggingInterceptor);
           // }

            OkHttpClient okHttpClient = builder.build();
            Gson gson = new GsonBuilder()
                    .registerTypeAdapter(Date.class,
                            new JsonDeserializer<Date>() {
                                public Date deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
                                        throws JsonParseException {
                                    Date date = null;
                                    try {
                                        date = getWCFDate(json.getAsString());
                                    } catch (Exception ex) {
                                        ex.printStackTrace();
                                    }
                                    return date;
                                }
                            }
                    )
                    .setDateFormat("yyyy-MM-dd hh:mm:ssZ").create();
            mRetrofit = new Retrofit.Builder()
                    .baseUrl(FrontDeskApiRepository.APP_SERVER_URL)
                    .addConverterFactory(GsonConverterFactory.create(gson))
                    .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                    .client(okHttpClient)
                    .build();
        }
        return mRetrofit;
    }

    public static Date getWCFDate(String raw) {
        String p = "(\\d+)\\+?(\\d+)?";
        Pattern pattern = Pattern.compile(p);
        Matcher matcher = pattern.matcher(raw);

        if (matcher.find()) {
            String result = matcher.group(1);
            return new Date(Long.parseLong(result));
        }
        return Calendar.getInstance().getTime();
    }
}
