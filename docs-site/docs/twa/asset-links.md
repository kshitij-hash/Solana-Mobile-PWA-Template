# Digital Asset Links

Configure Digital Asset Links for frameless TWA mode.

## Why Asset Links?

Without Digital Asset Links:
- ❌ URL bar shows at top
- ❌ Looks like a browser, not an app
- ❌ Users see your domain

With Digital Asset Links:
- ✅ Full-screen, no browser UI
- ✅ Looks and feels native
- ✅ True app experience

## How It Works

```
┌─────────────────────────────────────────┐
│ 1. App opens                            │
│    ↓                                    │
│ 2. Android checks:                      │
│    https://your-domain/.well-known/     │
│    assetlinks.json                      │
│    ↓                                    │
│ 3. Verifies:                            │
│    - Package name matches               │
│    - SHA256 fingerprint matches         │
│    ↓                                    │
│ 4. If verified → Frameless mode         │
│    If not → Shows URL bar               │
└─────────────────────────────────────────┘
```

## Step 1: Get SHA256 Fingerprint

```bash
keytool -list -v -keystore android.keystore
```

Look for:

```
Certificate fingerprints:
     SHA256: AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99
```

## Step 2: Update assetlinks.json

Edit `public/.well-known/assetlinks.json`:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.solanapwa.template",
      "sha256_cert_fingerprints": [
        "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
      ]
    }
  }
]
```

Replace:
- `com.solanapwa.template` with your package ID
- `AA:BB:CC:...` with your SHA256 fingerprint

## Step 3: Deploy

Deploy your PWA so the file is accessible at:

```
https://your-domain.com/.well-known/assetlinks.json
```

### Verify Accessibility

```bash
curl https://your-domain.com/.well-known/assetlinks.json
```

Should return your JSON.

### Common Hosting Issues

**Vercel/Next.js:**
File in `public/.well-known/` deploys automatically.

**Nginx:**
```nginx
location /.well-known/ {
    default_type application/json;
}
```

**Apache:**
```apache
<Directory "/.well-known">
    ForceType application/json
</Directory>
```

## Step 4: Verify Setup

### Google's Verification Tool

Visit: https://developers.google.com/digital-asset-links/tools/generator

Enter:
- Hosting site domain: `your-domain.com`
- App package name: `com.yourcompany.yourapp`
- App package fingerprint: Your SHA256

### Test on Device

1. Install APK
2. Open app
3. **No URL bar?** → Success!
4. **URL bar visible?** → Check configuration

## Multiple Fingerprints

Include both debug and release fingerprints:

```json
{
  "sha256_cert_fingerprints": [
    "AA:BB:CC:... (release)",
    "DD:EE:FF:... (debug)"
  ]
}
```

Get debug fingerprint:

```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android
```

## Troubleshooting

### URL Bar Still Showing

1. **Check JSON accessibility:**
   ```bash
   curl -I https://your-domain.com/.well-known/assetlinks.json
   # Should return 200 OK with application/json
   ```

2. **Validate JSON:**
   ```bash
   curl https://your-domain.com/.well-known/assetlinks.json | jq .
   ```

3. **Verify fingerprint matches:**
   - Compare with `keytool -list` output
   - Check for copy/paste errors
   - Ensure colons are included

4. **Clear Chrome cache:**
   - Settings → Apps → Chrome → Storage → Clear Data
   - This forces re-verification

5. **Check package name:**
   - Must exactly match `packageId` in `twa-manifest.json`

### "Asset statements not retrievable"

- Verify HTTPS is working
- Check for redirects (use final URL)
- Ensure `.well-known` directory exists
- File must be served as `application/json`

### Verification Delay

- Initial verification can take a few minutes
- Chrome caches verification for 24 hours
- For testing, clear Chrome data

## Best Practices

1. **Test before release** - Verify frameless mode works
2. **Include debug key** - Easier development testing
3. **Keep fingerprints updated** - New keys need new entries
4. **Monitor file availability** - 404 breaks frameless mode
5. **Use absolute URLs** - No relative paths in fingerprints
