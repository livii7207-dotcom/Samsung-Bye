# CodeMagic.io Configuration Guide - SanFw FRP Tool Mobile

This guide provides step-by-step instructions to configure CodeMagic.io for building the SanFw FRP Tool Mobile APK.

## Overview

The project includes two configuration files:
- **codemagic.yaml**: Build workflow configuration
- **eas.json**: Expo build settings

## Prerequisites

- CodeMagic.io account (already created)
- GitHub account with access to Samsung-Bye repository
- Expo account (for EAS builds)
- Android SDK knowledge (optional)

---

## Part 1: Initial CodeMagic Setup

### Step 1: Connect GitHub Repository

1. **Log in to CodeMagic.io**: https://codemagic.io
2. Click **"Add application"** or **"New app"**
3. Select **GitHub** as the repository provider
4. Search for **livii7207-dotcom/Samsung-Bye**
5. Click **"Next"** to proceed

### Step 2: Select Build Configuration

1. CodeMagic will detect the `codemagic.yaml` file
2. You'll see two workflows:
   - **android-debug-build**: For debug APK builds
   - **android-release-build**: For release APK builds
3. Select **"Use detected configuration"**
4. Click **"Next"**

### Step 3: Configure Environment Variables

CodeMagic needs the following environment variables. Add them in the **Environment variables** section:

#### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `EAS_USERNAME` | Your Expo username | For Expo build authentication |
| `EAS_PASSWORD` | Your Expo password | For Expo build authentication |
| `DEVELOPER_EMAIL` | your-email@example.com | Email for build notifications |

**How to add variables:**

1. Click **"Environment variables"** section
2. Click **"Add variable"**
3. Enter variable name (e.g., `EAS_USERNAME`)
4. Enter variable value
5. Check **"Secure"** checkbox to encrypt sensitive values
6. Click **"Add"**
7. Repeat for all variables

#### Optional Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `SLACK_WEBHOOK_URL` | Your Slack webhook | For Slack notifications |

---

## Part 2: Expo Account Setup

### Create/Configure Expo Account

If you don't have an Expo account:

1. Visit https://expo.dev
2. Click **"Sign up"**
3. Create account with email and password
4. Verify your email
5. Log in to Expo dashboard

### Configure EAS (Expo Application Services)

1. Go to https://expo.dev/eas
2. Create a new project or select existing
3. Link your GitHub repository
4. Configure build settings:
   - Platform: Android
   - Build type: APK
   - SDK version: 54

### Generate Expo Credentials

1. In Expo dashboard, go to **Credentials**
2. Select your project
3. For Android:
   - Generate or upload keystore
   - Note the keystore details
   - Save credentials securely

---

## Part 3: Configure Build Workflows

### Understanding the Workflows

#### Debug Build Workflow (`android-debug-build`)

**Trigger:** Push to `main` or `develop` branch, or pull requests

**What it does:**
1. Installs Node dependencies
2. Installs Expo CLI
3. Authenticates with Expo
4. Builds debug APK
5. Uploads artifact
6. Sends notifications

**Output:** `app-debug.apk`

**Use case:** Development and testing

#### Release Build Workflow (`android-release-build`)

**Trigger:** Git tag matching pattern `v*.*.*` (e.g., `v1.0.0`)

**What it does:**
1. Installs Node dependencies
2. Installs Expo CLI
3. Authenticates with Expo
4. Builds release APK
5. Uploads artifact
6. Sends notifications

**Output:** `app-release.apk`

**Use case:** Production releases

### Customizing Workflows

Edit `codemagic.yaml` to customize:

**Change build trigger:**
```yaml
triggering:
  events:
    - push
  branch:
    include:
      - main
```

**Change notification recipients:**
```yaml
publishing:
  email:
    recipients:
      - your-email@example.com
```

**Change build timeout:**
```yaml
max_build_duration: 120  # in minutes
```

---

## Part 4: Starting Your First Build

### Trigger Debug Build

**Method 1: Push to GitHub**
```bash
git add .
git commit -m "Trigger debug build"
git push origin main
```

**Method 2: Manual Trigger in CodeMagic**
1. Go to CodeMagic dashboard
2. Select the SanFw FRP Tool project
3. Click **"Start new build"**
4. Select workflow: **android-debug-build**
5. Select branch: **main**
6. Click **"Start build"**

### Monitor Build Progress

1. CodeMagic shows real-time build logs
2. Watch for these stages:
   - Dependencies installation
   - Expo authentication
   - APK compilation
   - Artifact upload

### Download Built APK

Once build completes:

1. Go to **Artifacts** section
2. Download `app-debug.apk`
3. Transfer to Android device
4. Install the APK

---

## Part 5: Troubleshooting Common Issues

### Build Fails: "Expo authentication failed"

**Problem:** EAS_USERNAME or EAS_PASSWORD incorrect

**Solution:**
1. Verify Expo credentials are correct
2. Update environment variables in CodeMagic
3. Retry build

### Build Fails: "Gradle build failed"

**Problem:** Gradle compilation error

**Solution:**
1. Check `app.config.ts` for errors
2. Verify all dependencies in `package.json`
3. Run `pnpm install` locally to verify
4. Check build logs for specific error

### Build Timeout

**Problem:** Build takes longer than max_build_duration

**Solution:**
1. Increase `max_build_duration` in codemagic.yaml
2. Change from 120 to 180 minutes
3. Commit and push changes

### APK Installation Fails

**Problem:** APK won't install on device

**Solution:**
1. Ensure Android 7.0 or higher
2. Enable "Unknown sources" in device settings
3. Check device storage space (need 500MB+)
4. Try uninstalling previous version first

### Build Succeeds but No Artifact

**Problem:** APK not available for download

**Solution:**
1. Check build logs for errors
2. Verify `artifacts` section in codemagic.yaml
3. Ensure output filename matches: `app-debug.apk`

---

## Part 6: Advanced Configuration

### Enable Slack Notifications

1. Create Slack webhook:
   - Go to Slack workspace settings
   - Create incoming webhook
   - Copy webhook URL

2. Add to CodeMagic environment variables:
   - Variable: `SLACK_WEBHOOK_URL`
   - Value: Your webhook URL
   - Check "Secure"

3. Update codemagic.yaml:
```yaml
publishing:
  slack:
    channel: '#builds'
    notify_on_build_start: true
```

### Customize Build Profiles

Edit `eas.json` to add custom profiles:

```json
{
  "build": {
    "custom-profile": {
      "distribution": "internal",
      "android": {
        "buildType": "apk",
        "gradleCommand": ":app:assembleDebug"
      }
    }
  }
}
```

### Add Pre-build Checks

Add to `codemagic.yaml` before build:

```yaml
scripts:
  - name: Run linter
    script: |
      pnpm lint
  - name: Run tests
    script: |
      pnpm test
```

---

## Part 7: Release Build Configuration

### Trigger Release Build

1. Create a git tag:
```bash
git tag v1.0.0
git push origin v1.0.0
```

2. CodeMagic automatically triggers release build
3. Builds `app-release.apk`
4. Sends release notifications

### Signing Release APK

The release APK is signed with your Expo keystore. To verify:

1. Go to Expo dashboard
2. Check Credentials section
3. Verify Android keystore is configured
4. Release APK is automatically signed

---

## Part 8: Continuous Integration Best Practices

### Recommended Workflow

1. **Development**: Push to `develop` branch
   - Triggers debug build
   - Tests in internal distribution
   - Quick feedback loop

2. **Staging**: Create pull request to `main`
   - CodeMagic builds debug APK
   - Review and test
   - Merge after approval

3. **Production**: Create git tag `v*.*.*`
   - CodeMagic builds release APK
   - Automatically signed
   - Ready for distribution

### Monitoring Builds

1. **Email notifications**: Configured in environment
2. **Slack notifications**: Optional, requires webhook
3. **CodeMagic dashboard**: Real-time status
4. **Build history**: View all past builds

---

## Part 9: Security Considerations

### Protect Sensitive Data

- All environment variables marked as "Secure" are encrypted
- Never commit credentials to repository
- Rotate Expo password periodically
- Use separate credentials for different environments

### Keystore Security

- Expo manages keystore securely
- Never share keystore file
- Keep backup of keystore credentials
- Document keystore password securely

---

## Part 10: Quick Reference

### Common Commands

**Trigger debug build:**
```bash
git push origin main
```

**Trigger release build:**
```bash
git tag v1.0.0
git push origin v1.0.0
```

**View build logs:**
- CodeMagic dashboard → Select project → View logs

**Download APK:**
- CodeMagic dashboard → Artifacts → Download

### Important Files

| File | Purpose |
|------|---------|
| `codemagic.yaml` | Build workflow configuration |
| `eas.json` | Expo build settings |
| `app.config.ts` | App configuration |
| `package.json` | Dependencies |

---

## Support & Resources

- **CodeMagic Docs**: https://docs.codemagic.io
- **Expo Docs**: https://docs.expo.dev
- **EAS Build**: https://docs.expo.dev/build/setup/
- **GitHub**: https://github.com/livii7207-dotcom/Samsung-Bye

---

## Next Steps

1. ✅ Add environment variables to CodeMagic
2. ✅ Trigger first debug build
3. ✅ Download and test APK
4. ✅ Configure Slack notifications (optional)
5. ✅ Set up release build workflow
6. ✅ Create first release tag

---

**Last Updated:** April 26, 2026
**Configuration Version:** 1.0
**Supported Platforms:** Android 7.0+
