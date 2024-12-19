package com.video_streaming_app.retrofit;
import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.PUT;
import retrofit2.http.Query;
import retrofit2.http.Url;

public interface UploadService {
    @PUT
    Call<ResponseBody> uploadFileToS3(@Url String url, @Body RequestBody file);
}
