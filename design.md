# SanFw FRP Tool Mobile - Interface Design

## Overview

The SanFw FRP Tool Mobile is a utility application designed to help users manage Factory Reset Protection (FRP) and perform device management tasks on Android devices. The app follows iOS Human Interface Guidelines with a clean, functional interface optimized for one-handed mobile usage in portrait orientation (9:16).

## Screen List

1. **Home Screen** - Main dashboard with quick access to core functions
2. **Device Connection Screen** - Detect and connect to Android devices via USB/ADB
3. **Device Info Screen** - Display connected device information and status
4. **FRP Removal Screen** - Step-by-step FRP bypass process
5. **Factory Reset Screen** - Initiate factory reset with confirmation
6. **CSC Change Screen** - Modify device CSC (Country/Carrier) settings
7. **Settings Screen** - App configuration and preferences
8. **Help & Guides Screen** - Instructions and troubleshooting

## Primary Content and Functionality

### Home Screen
- **Status Indicator**: Shows device connection status (Connected/Disconnected)
- **Quick Actions**: Four main buttons for core functions:
  - Remove FRP
  - Factory Reset
  - Change CSC
  - Device Info
- **Connection Status**: Visual indicator with device model name (if connected)
- **Recent Actions**: Log of last 3 operations performed
- **Settings Button**: Access to app settings and help

### Device Connection Screen
- **Device List**: Shows detected devices with connection status
- **Manual Connection**: Option to enter device details manually
- **Connection Status**: Real-time feedback during connection attempts
- **Troubleshooting Tips**: Quick help for connection issues
- **Refresh Button**: Manually scan for devices

### Device Info Screen
- **Device Details**: Display model, Android version, build number, serial number
- **FRP Status**: Current FRP lock status (Locked/Unlocked)
- **Battery Info**: Battery level and charging status
- **Storage Info**: Available storage space
- **Copy Buttons**: Quick copy to clipboard for each field
- **Refresh Button**: Update device information

### FRP Removal Screen
- **Step-by-Step Instructions**: Clear numbered steps for user to follow
- **Status Indicator**: Current step progress
- **Auto-Detection**: Automatically detect device state and suggest next action
- **Action Buttons**: "Start", "Next", "Confirm" buttons based on current step
- **Success/Error Messages**: Clear feedback on operation status
- **Retry Option**: Ability to retry failed operations

### Factory Reset Screen
- **Warning Message**: Clear warning about data loss
- **Confirmation Checkbox**: User must confirm before proceeding
- **Method Selection**: Choose between different reset methods if available
- **Progress Indicator**: Shows operation progress
- **Cancel Button**: Stop operation at any time

### CSC Change Screen
- **Current CSC Display**: Show current CSC value
- **CSC List**: Dropdown or searchable list of available CSCs
- **Region/Carrier Selection**: Filter CSCs by region
- **Apply Button**: Apply selected CSC
- **Confirmation**: Verify CSC change was successful

### Settings Screen
- **Connection Settings**: USB driver status, ADB settings
- **Appearance**: Theme selection (Light/Dark)
- **Notifications**: Toggle operation notifications
- **Logging**: Enable/disable operation logging
- **About**: App version and developer info
- **Clear Cache**: Option to clear app cache

### Help & Guides Screen
- **FAQ**: Frequently asked questions
- **Troubleshooting**: Common issues and solutions
- **Device Support**: List of supported devices
- **Contact Support**: Link to support resources
- **Changelog**: Recent updates and improvements

## Key User Flows

### Flow 1: Connect Device and Check FRP Status
1. User opens Home Screen
2. Taps "Device Connection" or sees connection prompt
3. Connects Android device via USB
4. App detects device and shows connection status
5. User navigates to "Device Info" to see FRP status
6. Device information is displayed with FRP lock status

### Flow 2: Remove FRP (Main Use Case)
1. User opens Home Screen
2. Taps "Remove FRP" button
3. App shows step-by-step instructions
4. User follows on-screen prompts (enable USB debugging, etc.)
5. App automatically detects when each step is complete
6. Upon completion, shows success message
7. User can view operation log or return to Home

### Flow 3: Factory Reset Device
1. User opens Home Screen
2. Taps "Factory Reset" button
3. App shows warning about data loss
4. User reads and confirms with checkbox
5. Selects reset method if multiple available
6. Taps "Start Reset"
7. Progress indicator shows operation status
8. Success message displayed upon completion

### Flow 4: Change CSC
1. User opens Home Screen
2. Taps "Change CSC" button
3. Current CSC is displayed
4. User searches or selects new CSC from list
5. Taps "Apply CSC"
6. Confirmation message shows new CSC applied
7. Device may reboot automatically

## Color Choices

| Element | Light Mode | Dark Mode | Purpose |
|---------|-----------|-----------|---------|
| Primary Brand | #0066CC | #4DB8FF | Main action buttons, active states |
| Background | #FFFFFF | #0F0F0F | Screen background |
| Surface | #F5F5F5 | #1A1A1A | Cards, elevated surfaces |
| Text Primary | #000000 | #FFFFFF | Main text content |
| Text Secondary | #666666 | #AAAAAA | Secondary labels, hints |
| Success | #34C759 | #30B0C0 | Success messages, completed operations |
| Warning | #FF9500 | #FFB84D | Warning messages, caution states |
| Error | #FF3B30 | #FF6B6B | Error messages, failed operations |
| Border | #E0E0E0 | #333333 | Dividers, card borders |

## Design Principles

- **Clarity**: Each screen has a single primary action with supporting information
- **Feedback**: User receives immediate visual feedback for all interactions
- **Safety**: Destructive operations require explicit confirmation
- **Accessibility**: Large touch targets (minimum 44pt), high contrast text
- **Efficiency**: Minimize steps to complete common tasks
- **Guidance**: Clear instructions and help available at each step
