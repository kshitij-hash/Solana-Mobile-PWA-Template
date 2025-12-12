/**
 * Custom LauncherActivity that forces Chrome as the TWA browser provider.
 *
 * This is the KEY SOLUTION for the RFP requirement:
 * "Default to Chrome browser, fall back to system default"
 *
 * Bubblewrap does NOT have a built-in option to force Chrome as the TWA provider.
 * This custom activity extends the android-browser-helper library to explicitly
 * prefer Chrome, with automatic fallback to the system default browser.
 *
 * USAGE:
 * 1. Copy this file to: app/src/main/java/[your-package-path]/
 * 2. Update AndroidManifest.xml to use CustomLauncherActivity instead of LauncherActivity
 * 3. Build with: ./gradlew assembleRelease
 */
package com.solanapwa.template;

import android.content.pm.PackageManager;
import android.util.Log;

import com.google.androidbrowserhelper.trusted.LauncherActivity;

/**
 * Custom LauncherActivity that prioritizes Chrome for TWA.
 * Falls back to system default if Chrome is not available.
 */
public class CustomLauncherActivity extends LauncherActivity {

    private static final String TAG = "CustomLauncherActivity";

    // Chrome package names in order of preference
    private static final String[] CHROME_PACKAGES = {
        "com.android.chrome",           // Stable Chrome
        "com.chrome.beta",              // Chrome Beta
        "com.chrome.dev",               // Chrome Dev
        "com.chrome.canary"             // Chrome Canary
    };

    /**
     * Override to specify Chrome as the preferred TWA provider.
     *
     * @return The package name of the preferred browser, or null to use default behavior
     */
    @Override
    protected String getProviderPackage() {
        // Try each Chrome variant in order of preference
        for (String chromePackage : CHROME_PACKAGES) {
            if (isPackageInstalled(chromePackage)) {
                Log.d(TAG, "Using Chrome package: " + chromePackage);
                return chromePackage;
            }
        }

        // Chrome not found - fall back to default system browser
        Log.d(TAG, "Chrome not found, falling back to system default");
        return null; // null triggers default behavior (system default browser)
    }

    /**
     * Check if a package is installed on the device.
     *
     * @param packageName The package name to check
     * @return true if installed, false otherwise
     */
    private boolean isPackageInstalled(String packageName) {
        try {
            getPackageManager().getPackageInfo(packageName, 0);
            return true;
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
    }
}
