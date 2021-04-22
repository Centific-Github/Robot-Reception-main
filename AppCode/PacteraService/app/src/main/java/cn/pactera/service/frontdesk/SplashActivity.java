package cn.pactera.service.frontdesk;


import android.app.Activity;
import android.content.Intent;
import android.os.Handler;
import android.os.Message;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.view.animation.AlphaAnimation;


/**
 * draft  in 12, 2019
 */


public class SplashActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        View view = LayoutInflater.from(this).inflate(R.layout.activity_splash,null);

        WindowManager wm = (WindowManager) getSystemService(WINDOW_SERVICE);

        requestWindowFeature(Window.FEATURE_NO_TITLE);

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN );
        super.onCreate(savedInstanceState);
        setContentView(view);


        AlphaAnimation ani = new AlphaAnimation(0.3f,1.0f);

        ani.setDuration(1500);

        view.startAnimation(ani);

        handler.sendEmptyMessageDelayed(1,2000);
    }


    private Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);

            if(msg.what==1)
            {
                Intent intent = new Intent(SplashActivity.this, PortalActivity.class);
                startActivity(intent);

                overridePendingTransition(R.anim.splash_main_anim_out, R.anim.splash_main_anim_in);
                SplashActivity.this.finish();
            }
        }
    };
}

