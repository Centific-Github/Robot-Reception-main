package cn.pactera.service.frontdesk.common;

/**
 * draft  in 12, 2019
 */

        import android.util.Base64;

        import java.security.InvalidParameterException;
        import java.security.MessageDigest;
        import java.security.spec.AlgorithmParameterSpec;

        import javax.crypto.Cipher;
        import javax.crypto.Mac;
        import javax.crypto.SecretKey;
        import javax.crypto.spec.IvParameterSpec;
        import javax.crypto.spec.SecretKeySpec;


public class EncryptUtil {


    public static String encryptAndBase64Encode(byte[] data, byte[] key, byte[] iv, String transformation) throws Exception {

        if (data == null || data.length == 0
                || key == null || key.length == 0
                || iv == null || iv.length == 0
                || transformation == null || transformation.length() == 0) {
            throw (new InvalidParameterException());
        }

        AlgorithmParameterSpec ivSpec = new IvParameterSpec(iv);
        SecretKeySpec newKey = new SecretKeySpec(key, "AES");
        Cipher cipher = Cipher.getInstance(transformation);
        cipher.init(Cipher.ENCRYPT_MODE, newKey, ivSpec);
        return Base64.encodeToString(cipher.doFinal(data), Base64.DEFAULT);
    }

    public static byte[] decryptBase64EncodeData(String data, byte[] key, byte[] iv, String transformation) throws Exception {

        if (data == null //|| data.length == 0
                || key == null || key.length < 16
                || iv == null || iv.length < 16
                || transformation == null || transformation.length() == 0) {
            throw (new InvalidParameterException());
        }

        byte[] textBytes = Base64.decode(data, Base64.DEFAULT);
        AlgorithmParameterSpec ivSpec = new IvParameterSpec(iv);
        SecretKeySpec newKey = new SecretKeySpec(key, "AES");
        Cipher cipher = Cipher.getInstance(transformation);
        cipher.init(Cipher.DECRYPT_MODE, newKey, ivSpec);
        return cipher.doFinal(textBytes);
    }
}
