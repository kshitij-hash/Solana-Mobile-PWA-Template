# Chrome Browser Preference

How the template forces Chrome as the TWA browser.

## The Problem

By default, TWA uses whichever browser:
1. Supports TWA protocol
2. Is set as default
3. Handles the domain

This could be Samsung Internet, Firefox, or others - not ideal for:
- **MWA compatibility** - Chrome has best wallet adapter support
- **Consistent experience** - Different browsers behave differently
- **Debugging** - Chrome DevTools is best for web debugging

## The Solution

A custom `LauncherActivity` that explicitly requests Chrome:

```java
// twa/CustomLauncherActivity.java
package com.solanapwa.template;

import android.content.pm.PackageManager;
import com.google.androidbrowserhelper.trusted.LauncherActivity;

public class CustomLauncherActivity extends LauncherActivity {

    private static final String[] CHROME_PACKAGES = {
        "com.android.chrome",     // Chrome Stable
        "com.chrome.beta",        // Chrome Beta
        "com.chrome.dev",         // Chrome Dev
        "com.chrome.canary"       // Chrome Canary
    };

    @Override
    protected String getProviderPackage() {
        // Try each Chrome variant
        for (String chromePackage : CHROME_PACKAGES) {
            if (isPackageInstalled(chromePackage)) {
                return chromePackage;
            }
        }
        // Fall back to system default
        return null;
    }

    private boolean isPackageInstalled(String packageName) {
        try {
            getPackageManager().getPackageInfo(packageName, 0);
            return true;
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
    }
}
```

## How It Works

1. **App launches** → `CustomLauncherActivity.onCreate()`
2. **getProviderPackage()** is called
3. **Check for Chrome** in order: Stable → Beta → Dev → Canary
4. **If found** → Return package name → Chrome opens your PWA
5. **If not found** → Return null → System default browser

## Fallback Behavior

If Chrome isn't installed:

| Scenario | Result |
|----------|--------|
| Chrome installed | Opens in Chrome (frameless if DAL configured) |
| Chrome not installed | Opens in system default browser |
| No TWA browser | Falls back to Custom Tabs (with URL bar) |

## Integration

The build script (`build-twa.sh`) handles integration:

```bash
# 1. Copy custom activity to Android project
cp CustomLauncherActivity.java app/src/main/java/com/solanapwa/template/

# 2. Update AndroidManifest.xml to use it
sed -i 's/LauncherActivity/.CustomLauncherActivity/g' app/src/main/AndroidManifest.xml
```

## Manual Integration

If not using the build script:

### 1. Copy Activity

Copy `CustomLauncherActivity.java` to your Android project:

```
app/src/main/java/[your-package-path]/CustomLauncherActivity.java
```

### 2. Update Package Name

Edit the package declaration:

```java
package com.yourcompany.yourapp;  // Match your package ID
```

### 3. Update Manifest

In `app/src/main/AndroidManifest.xml`:

```xml
<!-- Replace this -->
<activity
    android:name="com.google.androidbrowserhelper.trusted.LauncherActivity"
    android:exported="true">

<!-- With this -->
<activity
    android:name=".CustomLauncherActivity"
    android:exported="true">
```

## Testing

### Verify Chrome is Used

1. Install TWA on device with Chrome
2. Open the app
3. Long-press recents button
4. Check which browser appears in app info

### Test Without Chrome

1. Disable Chrome in Settings → Apps → Chrome → Disable
2. Open your TWA
3. Verify it falls back to another browser
4. Re-enable Chrome

## Why Not Just Set Chrome as Default?

- Users control their default browser
- Chrome might not be the default
- Samsung/Xiaomi devices often default to their browsers
- This approach respects user choice while preferring Chrome

## Logging

The activity logs its behavior:

```java
Log.d("CustomLauncherActivity", "Using Chrome package: com.android.chrome");
// or
Log.d("CustomLauncherActivity", "Chrome not found, falling back to system default");
```

View logs with:

```bash
adb logcat | grep CustomLauncherActivity
```

## Compatibility

| Android Version | Support |
|-----------------|---------|
| Android 7.0+ (API 24) | Full support |
| Android 6.0 (API 23) | Not supported |

Older devices won't run TWA at all - they need `minSdkVersion: 24`.
