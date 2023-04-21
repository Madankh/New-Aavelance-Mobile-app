package com.aavelance;

import android.annotation.SuppressLint;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DiscoverPost extends ReactContextBaseJavaModule {
    public DiscoverPost(ReactApplicationContext reactContext) {
        super(reactContext);

    }

    @NonNull
    @Override
    public String getName() {
        return "DiscoverPost";
    }

    @SuppressLint("NotConstructor")
    @ReactMethod
    public void DiscoverPost(String name , Callback callback){
        try {
            String message = "Hello" + name;
            callback.invoke(null , message);
        }catch (Exception e){
            callback.invoke(e, null);
        }

    }
}
