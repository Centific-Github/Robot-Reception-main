package cn.pactera.service.frontdesk.model;


import com.google.gson.annotations.SerializedName;

/**
 * draft  in 12, 2019
 */

public class ResponseJsonEntity<T>  {

    public ResponseJsonEntity()
    {

    }

    public String getMessage() {
        return Message;
    }

    public void setMessage(String message) {
        Message = message;
    }

    public int getStatus() {
        return Status;
    }

    public void setStatus(int status) {
        Status = status;
    }

    public T getData() {
        return Data;
    }

    public void setData(T data) {
//        ((BaseJsonEntity<T>)data).parseJson2Entity()
        Data = data;
    }

    @SerializedName("msg")
    public String Message;

    @SerializedName("status")
    public int Status;

    @SerializedName("data")
    public T Data;


}