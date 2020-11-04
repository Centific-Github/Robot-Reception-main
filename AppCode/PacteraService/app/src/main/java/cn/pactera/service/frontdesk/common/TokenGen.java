package cn.pactera.service.frontdesk.common;

/**
 * draft  in 12, 2019
 */

import android.util.Base64;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

public class TokenGen {

    public static String Hmac_sha1_Signature(String key, String datas) {
        String reString = "";

        try {
            byte[] data = key.getBytes("UTF-8");
            SecretKey secretKey = new SecretKeySpec(data, "HmacSHA1");
            Mac mac = Mac.getInstance("HmacSHA1");
            mac.init(secretKey);

            byte[] text = datas.getBytes("UTF-8");
            byte[] text1 = mac.doFinal(text);

            reString = Base64.encodeToString(text1, Base64.DEFAULT);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return reString.trim();
    }
}
