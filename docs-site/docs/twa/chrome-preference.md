# Chrome Browser Preference

How the TWA automatically prefers Chrome for MWA compatibility.

## Why Chrome Matters

Chrome is essential for Solana Mobile TWAs because:

- **MWA compatibility** - Mobile Wallet Adapter works best with Chrome
- **TWA support** - Chrome has the most mature TWA implementation
- **Consistent experience** - Predictable behavior across devices

## Automatic Chrome Preference

The `android-browser-helper` library (v2.6.2+) **automatically prefers Chrome** when it's installed on the device. No custom configuration is needed.

The library checks for available TWA-capable browsers in this order:
1. Chrome Stable (`com.android.chrome`)
2. Chrome Beta (`com.chrome.beta`)
3. Chrome Dev (`com.chrome.dev`)
4. Other TWA-compatible browsers

## Fallback Behavior

| Scenario | Result |
|----------|--------|
| Chrome installed | Opens in Chrome (frameless if DAL configured) |
| Chrome not installed | Opens in system default TWA browser |
| No TWA browser | Falls back to Custom Tabs (with URL bar) |

## CustomLauncherActivity

The template includes a `CustomLauncherActivity.java` for optional customizations:

```java
public class CustomLauncherActivity extends LauncherActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Lock to portrait orientation on Android 8+
        if (Build.VERSION.SDK_INT > Build.VERSION_CODES.O) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }
    }

    @Override
    protected Uri getLaunchingUrl() {
        // Customize launch URL if needed
        Uri uri = super.getLaunchingUrl();
        // Add query parameters, handle deep links, etc.
        return uri;
    }
}
```

### Available Customizations

| Method | Purpose |
|--------|---------|
| `onCreate()` | Set screen orientation, initialize tracking |
| `getLaunchingUrl()` | Modify launch URL, add parameters |

## Verifying Chrome is Used

### Check via Recent Apps

1. Open your TWA
2. Long-press the recent apps button
3. Check which browser appears in app info

### Check via ADB Logs

```bash
adb logcat | grep -i "chrome\|twa\|launcher"
```

## What If Chrome Isn't Available?

If the user doesn't have Chrome:

1. **Samsung devices** - Samsung Internet may be used (supports TWA)
2. **Other devices** - System default browser
3. **No TWA support** - Falls back to Custom Tabs with URL bar

::: tip MWA Recommendation
For best MWA experience, recommend users install Chrome if wallet connections fail.
:::

## Testing Without Chrome

To test fallback behavior:

1. Disable Chrome: Settings > Apps > Chrome > Disable
2. Open your TWA
3. Observe fallback behavior
4. Re-enable Chrome

## Compatibility

| Android Version | Chrome TWA Support |
|-----------------|-------------------|
| Android 7.0+ (API 24) | Full support |
| Android 6.0 (API 23) | Not supported |

TWA requires `minSdkVersion: 24` (Android 7.0).
