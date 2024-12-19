package com.video_streaming_app.module;

import android.content.Context;
import android.database.Cursor;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.provider.MediaStore;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.module.NativeUploaderSpec;
import com.video_streaming_app.retrofit.ProgressRequestBody;
import com.video_streaming_app.retrofit.RetrofitClient;
import com.video_streaming_app.retrofit.UploadService;

import java.io.File;
import java.net.URLConnection;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MyNativeUploader extends NativeUploaderSpec {

    private final ExecutorService executorService;

    public MyNativeUploader(ReactApplicationContext reactContext) {
        super(reactContext);
        executorService = Executors.newSingleThreadExecutor();
    }

    @Override
    public void uploadFile(String signedURL, String filePath, String contentType, Promise promise) {
        Log.d("NativeModule", "Start uploadFile, filePath: "+filePath);
        Log.d("NativeModule", "Start uploadFile, signedURL: "+signedURL);
        if (filePath == null || filePath.isEmpty()) {
            promise.reject("UPLOAD_ERROR", "Invalid file path");
            return;
        }

        Uri fileUri = Uri.parse(filePath);
        String path = resolveFilePath(fileUri, promise);
        Log.d("NativeModule", "extracted path: "+path);
        if (path == null) return;

        File file = new File(path);
        if (!file.exists()) {
            promise.reject("UPLOAD_ERROR", "File does not exist at path: " + path);
            return;
        }
        executorService.submit(() -> {
            try {
                // Bắt đầu quá trình tải file
                uploadFileToS3(file, signedURL, contentType, new UploadCallback() {
                    @Override
                    public void onUploadSuccess() {
                        promise.resolve(file.getName());
                    }

                    @Override
                    public void onUploadFailure(String error) {
                        promise.reject("UPLOAD_ERROR", error);
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
                Log.e("NativeModule", "Error in uploadFile: ", e);
                new Handler(Looper.getMainLooper()).post(() -> promise.reject("UPLOAD_ERROR", e.getMessage()));
            }
        });
    }


    public String getRealPathFromURI(Context context, Uri uri) {
        String path = null;
        String[] proj = {MediaStore.Images.Media.DATA};

        // ContentResolver truy xuất tệp từ URI
        Cursor cursor = context.getContentResolver().query(uri, proj, null, null, null);
        if (cursor != null) {
            int columnIndex = cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA);
            if (cursor.moveToFirst()) {
                path = cursor.getString(columnIndex);
            }
            cursor.close();
        }
        return path;
    }


    private void sendEvent(int progress) {
        getReactApplicationContext()
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("updateProgress", progress);
    }

    private String resolveFilePath(Uri fileUri, Promise promise) {
        String filePath = null;

        if ("file".equals(fileUri.getScheme())) {
            filePath = fileUri.getPath();
        } else {
            try {
                filePath = getRealPathFromURI(getReactApplicationContext(), fileUri);
            } catch (Exception e) {
                new Handler(Looper.getMainLooper()).post(() -> promise.reject("UPLOAD_ERROR", "Failed to resolve file path", e));
            }
        }

        if (filePath == null || filePath.isEmpty()) {
            new Handler(Looper.getMainLooper()).post(() -> promise.reject("UPLOAD_ERROR", "File path is null or empty"));
            return null;
        }

        return filePath;
    }

    private void uploadFileToS3(File file, String presignedUrl, String contentType, UploadCallback callback) {
        Log.d("NativeModule > uploadFileToS3()", "Start uploadFileToS3");
        Log.d("NativeModule > uploadFileToS3()", "contentType: "+ contentType);
        Log.d("NativeModule > uploadFileToS3()", "File: "+ file.getName());
        ProgressRequestBody requestBody = new ProgressRequestBody(
                file,
                contentType,
                (bytesWritten, contentLength) -> {
                    int progress = (int) ((bytesWritten * 100) / contentLength);
                    sendEvent(progress);
                }
        );

        UploadService uploadService = RetrofitClient.createUploadService();
        Call<ResponseBody> call = uploadService.uploadFileToS3(presignedUrl, requestBody);
        call.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.isSuccessful()) {
                    callback.onUploadSuccess();
                } else {
                    callback.onUploadFailure("Upload failed with code: " + response.code());
                }
            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                callback.onUploadFailure("Upload failed: " + t.getMessage());
            }
        });
    }

    interface UploadCallback {
        void onUploadSuccess();
        void onUploadFailure(String error);
    }
}
