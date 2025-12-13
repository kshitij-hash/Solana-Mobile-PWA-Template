/**
 * Custom LauncherActivity for Solana Mobile PWA TWA.
 *
 * This activity extends the default LauncherActivity to provide any
 * customizations needed for Solana Mobile dApps.
 *
 * NOTE: The android-browser-helper library automatically prefers Chrome
 * for TWAs when available. The TwaProviderPicker class internally checks
 * for installed browsers and selects Chrome by default.
 *
 * This custom activity can be used for:
 * - Custom URL handling via getLaunchingUrl()
 * - Custom splash screen behavior
 * - Adding query parameters or handling deep links
 *
 * USAGE:
 * 1. Copy this file to: app/src/main/java/[your-package-path]/
 * 2. Update package name to match your app
 * 3. Update AndroidManifest.xml to use CustomLauncherActivity
 */
package com.solanapwa.template;

import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import com.google.androidbrowserhelper.trusted.LauncherActivity;

/**
 * Custom LauncherActivity for Solana Mobile PWA.
 *
 * Chrome is automatically preferred by the android-browser-helper library
 * when it's installed, which is required for Mobile Wallet Adapter (MWA)
 * to work properly on Android.
 */
public class CustomLauncherActivity extends LauncherActivity {

    private static final String TAG = "CustomLauncherActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Setting an orientation crashes the app due to the transparent background on Android 8.0
        // Oreo and below. We only set the orientation on Oreo and above.
        // See https://github.com/GoogleChromeLabs/bubblewrap/issues/496 for details.
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.O) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        } else {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
        }

        Log.d(TAG, "CustomLauncherActivity started");
    }

    @Override
    protected Uri getLaunchingUrl() {
        // Get the original launch URL
        Uri uri = super.getLaunchingUrl();

        // You can customize the launch URL here if needed
        // For example, adding query parameters:
        // uri = uri.buildUpon().appendQueryParameter("source", "twa").build();

        Log.d(TAG, "Launching URL: " + uri.toString());
        return uri;
    }
}
