package com.wallx;

import android.app.WallpaperManager;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Log;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class WallpaperUtil {
    public static void setWallpaper(Context context, String wallpaperUrl) {
        new WallpaperTask(context).execute(wallpaperUrl);
    }

    private static class WallpaperTask extends AsyncTask<String, Void, Bitmap> {
        private Context context;

        public WallpaperTask(Context context) {
            this.context = context;
        }

        @Override
        protected Bitmap doInBackground(String... params) {
            String wallpaperUrl = params[0];
            try {
                URL url = new URL(wallpaperUrl);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setDoInput(true);
                connection.connect();
                InputStream input = connection.getInputStream();
                return BitmapFactory.decodeStream(input);
            } catch (IOException e) {
                Log.e("WallpaperUtil", "Error downloading wallpaper: " + e.getMessage());
            }
            return null;
        }

        @Override
        protected void onPostExecute(Bitmap bitmap) {
            if (bitmap != null) {
                WallpaperManager wallpaperManager = WallpaperManager.getInstance(context);
                try {
                    wallpaperManager.setBitmap(bitmap);
                    Log.d("WallpaperUtil", "Wallpaper set successfully");
                } catch (IOException e) {
                    Log.e("WallpaperUtil", "Error setting wallpaper: " + e.getMessage());
                }
            }
        }
    }
}
