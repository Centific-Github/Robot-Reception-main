package cn.pactera.service.frontdesk;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class PortalActivity extends Activity implements View.OnClickListener {

    ImageButton buVisitt;
    ImageButton buDeliver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_portal);

        buVisitt = (ImageButton) findViewById(R.id.portal_bu_visitor);
        buDeliver = (ImageButton) findViewById(R.id.portal_bu_deliver);

        buVisitt.setOnClickListener(this);
        buDeliver.setOnClickListener(this);


    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.portal_bu_visitor:
                startActivity(new Intent(PortalActivity.this,VisitorActivity.class));
                break;

        }
    }



}
