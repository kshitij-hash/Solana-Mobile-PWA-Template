# TWA Troubleshooting

Common issues and solutions when building TWA apps.

## Build Issues

### "JDK not found"

**Error:**
```
Error: JDK not found
```

**Solution:**
```bash
# Let Bubblewrap install JDK
bubblewrap doctor

# Or set JAVA_HOME manually
export JAVA_HOME=/path/to/jdk17
```

**macOS with Homebrew:**
```bash
export JAVA_HOME=/opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk/Contents/Home
```

### "Android SDK not found"

**Error:**
```
Error: Android SDK not found
```

**Solution:**
```bash
# Let Bubblewrap install SDK
bubblewrap doctor

# Or set ANDROID_HOME
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### "Manifest not found"

**Error:**
```
Error: Could not fetch manifest from https://...
```

**Solution:**
1. Verify URL is correct and accessible
2. Check manifest.json returns valid JSON
3. Ensure HTTPS is working
4. Try `curl https://your-domain.com/manifest.json`

### Build Hangs

**Issue:** Build process stops responding

**Solution:**
```bash
# Kill and retry
pkill -f bubblewrap
bubblewrap build

# Or skip validation
bubblewrap build --skipPwaValidation
```

## Runtime Issues

### URL Bar Showing

**Cause:** Digital Asset Links not configured

**Solutions:**
1. Verify `assetlinks.json` is accessible:
   ```bash
   curl https://your-domain.com/.well-known/assetlinks.json
   ```

2. Check package name matches exactly

3. Verify SHA256 fingerprint:
   ```bash
   keytool -list -v -keystore android.keystore | grep SHA256
   ```

4. Clear Chrome cache on device:
   Settings → Apps → Chrome → Storage → Clear Data

5. Reinstall the TWA app

### White Screen on Launch

**Causes:**
- PWA not loading
- JavaScript errors
- Network issues

**Solutions:**
1. Check PWA loads in browser first
2. Verify start_url in manifest.json
3. Check for console errors (connect to Chrome DevTools)
4. Ensure HTTPS certificate is valid

### App Crashes Immediately

**Causes:**
- Package name mismatch
- Missing permissions
- Chrome not installed

**Solutions:**
1. Verify package name in manifest matches build
2. Check Android logs:
   ```bash
   adb logcat | grep -i crash
   ```
3. Ensure Chrome is installed on device

### MWA Not Working

**Causes:**
- Chrome not the active browser
- Wallet not installed
- Network issues

**Solutions:**
1. Verify Chrome preference is working (check logs)
2. Install a Solana wallet (Phantom, Solflare)
3. Test MWA in regular Chrome first

### Splash Screen Issues

**Symptom:** Splash shows forever / doesn't fade

**Solutions:**
1. Check `splashScreenFadeOutDuration` in twa-manifest.json
2. Verify PWA loads correctly
3. Check for JavaScript errors preventing load complete

## Keystore Issues

### Lost Keystore Password

**Bad news:** Can't recover. Create new keystore.

**Prevention:**
- Store password in password manager
- Keep backup in secure location
- Document passwords securely

### Can't Update App

**Cause:** Different signing key than original

**Solution:** Must release as new app with new package ID

### Keystore Corrupted

**Solution:**
```bash
# Verify keystore
keytool -list -v -keystore android.keystore

# If corrupted, create new
keytool -genkeypair -alias android -keyalg RSA -keysize 2048 -validity 10000 -keystore android.keystore
```

## Installation Issues

### "App not installed"

**Causes:**
- Signature mismatch (different key)
- Insufficient storage
- Incompatible Android version

**Solutions:**
1. Uninstall existing app first
2. Check device storage
3. Verify minSdkVersion (24 = Android 7.0)

### Can't Install via ADB

```bash
# Check device connected
adb devices

# Force install
adb install -r app-release-signed.apk

# Clear existing
adb uninstall com.yourpackage.name
adb install app-release-signed.apk
```

## Debugging

### Chrome Remote Debugging

1. Enable USB debugging on device
2. Open Chrome on desktop
3. Navigate to `chrome://inspect`
4. Find your TWA under "Remote Target"
5. Click "Inspect"

### ADB Logs

```bash
# All logs
adb logcat

# Filter by tag
adb logcat -s CustomLauncherActivity

# Filter by app
adb logcat --pid=$(adb shell pidof com.solanapwa.template)
```

### Network Debugging

```bash
# Check connectivity from device
adb shell ping your-domain.com

# Check Chrome's network
# In Chrome DevTools → Network tab
```

## Performance Issues

### Slow Initial Load

**Solutions:**
1. Optimize PWA bundle size
2. Implement service worker caching
3. Use code splitting
4. Preload critical resources

### High Memory Usage

**Solutions:**
1. Profile with Chrome DevTools
2. Check for memory leaks
3. Optimize images
4. Lazy load heavy components

## Getting Help

1. **Check Bubblewrap issues:** [GitHub Issues](https://github.com/GoogleChromeLabs/bubblewrap/issues)

2. **Solana Mobile Discord:** [Community support](https://discord.gg/solanamobile)

3. **Chrome TWA docs:** [developer.chrome.com](https://developer.chrome.com/docs/android/trusted-web-activity)

4. **Template issues:** [GitHub](https://github.com/kshitij-hash/Solana-Mobile-PWA-Template/issues)
