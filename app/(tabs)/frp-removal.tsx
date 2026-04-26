import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";
import { ScreenContainer } from "@/components/screen-container";

const APK_URL = "https://d.frpbypass.io/apk/FRP%20Bypass.apk";
const APK_FILENAME = "frp-bypass.apk";

type DownloadStatus = "idle" | "downloading" | "installing" | "done" | "error";
type Method = null | "talkback" | "emergency" | "download";

interface Step {
  title: string;
  instructions: string[];
  warning?: string;
}

const talkbackSteps: Step[] = [
  {
    title: "Connect to Wi-Fi",
    instructions: [
      "On the Samsung setup screen, connect to any available Wi-Fi network.",
      "Wait for the connection to confirm before continuing.",
    ],
  },
  {
    title: "Enable TalkBack",
    instructions: [
      "Press and hold BOTH volume buttons (Up + Down) at the same time for 3 seconds.",
      "A TalkBack tutorial popup will appear — tap OK to confirm.",
      "TalkBack is now on. The screen will behave differently.",
    ],
    warning: "With TalkBack on: swipe right/left to move between items, double-tap to select.",
  },
  {
    title: "Open Keyboard Settings",
    instructions: [
      "On the setup screen, tap any text field to bring up the keyboard.",
      "Look for the settings gear icon on the keyboard toolbar — double-tap it.",
      "If you see no gear, long-press the keyboard space bar to open language settings.",
    ],
  },
  {
    title: "Open a Browser Link",
    instructions: [
      "Inside keyboard settings, scroll down and double-tap 'Open source licenses' or 'Help & feedback'.",
      "This opens a web view inside the settings.",
      "Tap the address bar at the top and type: google.com — then double-tap Go.",
    ],
    warning: "If there is no address bar, look for any blue underlined link and double-tap it.",
  },
  {
    title: "Download the Bypass App",
    instructions: [
      "In the browser, search for 'Samsung FRP bypass APK' and download one.",
      "When prompted, tap 'Allow' to download from unknown sources.",
      "After download, tap the notification and install the app.",
    ],
  },
  {
    title: "Remove FRP",
    instructions: [
      "Open the bypass app you just installed.",
      "Follow the on-screen instructions inside that app.",
      "After it completes, restart your device.",
      "The FRP lock should now be removed.",
    ],
  },
];

const emergencySteps: Step[] = [
  {
    title: "Connect to Wi-Fi",
    instructions: [
      "On the Samsung setup screen, connect to any available Wi-Fi network.",
    ],
  },
  {
    title: "Open Emergency Dialer",
    instructions: [
      "On the 'Sign in to Google' screen, tap 'Emergency call' at the bottom.",
      "You will see a dial pad.",
    ],
  },
  {
    title: "Access Hidden Menu",
    instructions: [
      "On the dial pad, type exactly: *#0*#",
      "If a hardware test screen opens, press the back button to exit.",
      "Then type: *#07# to check if another menu opens.",
    ],
    warning: "If neither code works on your device, go back and try the TalkBack method instead.",
  },
  {
    title: "Access Keyboard Settings",
    instructions: [
      "Go back to the emergency dialer screen.",
      "Long-press the @ or & key on the dial pad keyboard.",
      "Select 'Samsung Keyboard Settings' from the menu.",
    ],
  },
  {
    title: "Open a Browser Link",
    instructions: [
      "Inside keyboard settings, scroll down and tap 'Open source licenses'.",
      "This opens a web browser view.",
      "Tap the address bar and type: google.com — then tap Go.",
    ],
  },
  {
    title: "Download and Install Bypass App",
    instructions: [
      "Search for 'Samsung FRP bypass APK' and download one.",
      "Tap Allow when asked about unknown sources.",
      "Install the downloaded app and open it.",
      "Follow its instructions to remove FRP.",
    ],
  },
];

export default function FRPRemovalScreen() {
  const [method, setMethod] = React.useState<Method>(null);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [dlStatus, setDlStatus] = React.useState<DownloadStatus>("idle");
  const [progress, setProgress] = React.useState(0);
  const [errorMsg, setErrorMsg] = React.useState("");

  const steps = method === "talkback" ? talkbackSteps : emergencySteps;
  const currentStep = method && method !== "download" ? steps[stepIndex] : null;
  const isLast = currentStep ? stepIndex === steps.length - 1 : false;

  const reset = () => {
    setMethod(null);
    setStepIndex(0);
    setDlStatus("idle");
    setProgress(0);
    setErrorMsg("");
  };

  const handleDownload = async () => {
    setDlStatus("downloading");
    setProgress(0);
    setErrorMsg("");
    try {
      const fileUri = FileSystem.cacheDirectory + APK_FILENAME;
      const dl = FileSystem.createDownloadResumable(APK_URL, fileUri, {}, ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
        if (totalBytesExpectedToWrite > 0) setProgress(totalBytesWritten / totalBytesExpectedToWrite);
      });
      const result = await dl.downloadAsync();
      if (!result || result.status !== 200) throw new Error("Download failed");
      setDlStatus("installing");
      const contentUri = await FileSystem.getContentUriAsync(result.uri);
      await Linking.openURL(contentUri);
      setDlStatus("done");
    } catch (e: any) {
      setErrorMsg(e?.message ?? "Something went wrong");
      setDlStatus("error");
    }
  };

  if (!method) {
    return (
      <ScreenContainer className="p-6">
        <View className="flex-1 gap-6">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">FRP Bypass Guide</Text>
            <Text className="text-sm text-muted">Choose a method to try</Text>
          </View>

          <TouchableOpacity
            onPress={() => setMethod("talkback")}
            className="bg-primary rounded-2xl p-5 active:opacity-80 gap-2"
          >
            <Text className="text-white text-lg font-bold">TalkBack Method</Text>
            <Text className="text-white text-sm opacity-80">
              Works on most Samsung devices. Uses the accessibility feature to reach a browser.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMethod("emergency")}
            className="bg-surface rounded-2xl p-5 border border-border active:opacity-80 gap-2"
          >
            <Text className="text-foreground text-lg font-bold">Emergency Call Method</Text>
            <Text className="text-muted text-sm">
              Uses the emergency dialer and keyboard settings to reach a browser.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMethod("download")}
            className="bg-surface rounded-2xl p-5 border border-border active:opacity-80 gap-2"
          >
            <Text className="text-foreground text-lg font-bold">Download Bypass APK</Text>
            <Text className="text-muted text-sm">
              Downloads the FRP bypass tool directly to this device and opens the installer.
            </Text>
          </TouchableOpacity>

          <View className="bg-warning bg-opacity-10 rounded-xl p-4 border border-warning border-opacity-30">
            <Text className="text-sm font-semibold text-foreground mb-1">Before you start</Text>
            <Text className="text-xs text-muted leading-relaxed">
              Make sure the locked Samsung is connected to Wi-Fi. Both methods walk you through the steps to reach a browser and download a bypass tool.
            </Text>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  if (method === "download") {
    return (
      <ScreenContainer className="p-6">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 gap-6">
            <View className="gap-2">
              <Text className="text-2xl font-bold text-foreground">Download Bypass APK</Text>
              <Text className="text-sm text-muted">Install the FRP bypass tool on this device</Text>
            </View>

            {dlStatus === "idle" && (
              <View className="bg-surface rounded-xl p-5 border border-border gap-3">
                <Text className="text-base text-foreground leading-relaxed">
                  Tap the button below to download and install the FRP bypass tool.
                </Text>
                <Text className="text-xs text-muted leading-relaxed">
                  You may be asked to allow installation from unknown sources — tap Allow when prompted.
                </Text>
              </View>
            )}
            {dlStatus === "downloading" && (
              <View className="bg-surface rounded-xl p-5 border border-border gap-3">
                <Text className="text-base font-semibold text-foreground">Downloading...</Text>
                <View className="h-3 bg-border rounded-full overflow-hidden">
                  <View className="h-3 bg-primary rounded-full" style={{ width: `${Math.round(progress * 100)}%` }} />
                </View>
                <Text className="text-sm text-muted text-center">{Math.round(progress * 100)}%</Text>
              </View>
            )}
            {dlStatus === "installing" && (
              <View className="bg-primary bg-opacity-10 rounded-xl p-5 border border-primary border-opacity-30">
                <Text className="text-base font-semibold text-foreground">Opening installer...</Text>
                <Text className="text-sm text-muted mt-2">Tap Install when the system prompt appears.</Text>
              </View>
            )}
            {dlStatus === "done" && (
              <View className="bg-success bg-opacity-10 rounded-xl p-5 border border-success border-opacity-30">
                <Text className="text-base font-semibold text-foreground">Installed!</Text>
                <Text className="text-sm text-muted mt-2">Open the bypass tool app to continue.</Text>
              </View>
            )}
            {dlStatus === "error" && (
              <View className="bg-error bg-opacity-10 rounded-xl p-5 border border-error border-opacity-30">
                <Text className="text-base font-semibold text-foreground">Failed</Text>
                <Text className="text-sm text-muted mt-2">{errorMsg}</Text>
              </View>
            )}

            {(dlStatus === "idle" || dlStatus === "error") && (
              <TouchableOpacity onPress={handleDownload} className="bg-primary rounded-2xl w-full py-5 active:opacity-80">
                <Text className="text-white text-center text-xl font-bold">
                  {dlStatus === "error" ? "Try Again" : "Download & Install"}
                </Text>
              </TouchableOpacity>
            )}
            {dlStatus === "done" && (
              <TouchableOpacity onPress={reset} className="bg-surface rounded-2xl w-full py-5 border border-border active:opacity-80">
                <Text className="text-foreground text-center text-xl font-bold">Start Over</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={reset} className="items-center py-2">
              <Text className="text-sm text-muted">← Choose different method</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-5">
          {/* Progress */}
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-xs font-semibold text-muted uppercase tracking-wide">
                {method === "talkback" ? "TalkBack Method" : "Emergency Call Method"}
              </Text>
              <Text className="text-xs font-semibold text-muted">
                Step {stepIndex + 1} of {steps.length}
              </Text>
            </View>
            <View className="h-2 bg-border rounded-full overflow-hidden flex-row gap-1">
              {steps.map((_, i) => (
                <View
                  key={i}
                  className={`flex-1 rounded-full ${i <= stepIndex ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </View>
          </View>

          {/* Step title */}
          <Text className="text-2xl font-bold text-foreground">{currentStep.title}</Text>

          {/* Instructions */}
          <View className="bg-surface rounded-xl p-5 border border-border gap-4">
            {currentStep.instructions.map((line, i) => (
              <View key={i} className="flex-row gap-3">
                <View className="w-6 h-6 rounded-full bg-primary items-center justify-center mt-0.5">
                  <Text className="text-white text-xs font-bold">{i + 1}</Text>
                </View>
                <Text className="text-base text-foreground leading-relaxed flex-1">{line}</Text>
              </View>
            ))}
          </View>

          {/* Warning */}
          {currentStep.warning && (
            <View className="bg-warning bg-opacity-10 rounded-xl p-4 border border-warning border-opacity-30">
              <Text className="text-sm text-foreground leading-relaxed">{currentStep.warning}</Text>
            </View>
          )}

          {/* Navigation */}
          <View className="flex-row gap-3 mt-auto">
            {stepIndex > 0 && (
              <TouchableOpacity
                onPress={() => setStepIndex(stepIndex - 1)}
                className="flex-1 bg-surface rounded-2xl py-4 border border-border active:opacity-80"
              >
                <Text className="text-foreground text-center font-bold text-lg">Back</Text>
              </TouchableOpacity>
            )}

            {!isLast ? (
              <TouchableOpacity
                onPress={() => setStepIndex(stepIndex + 1)}
                className="flex-1 bg-primary rounded-2xl py-4 active:opacity-80"
              >
                <Text className="text-white text-center font-bold text-lg">Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={reset}
                className="flex-1 bg-primary rounded-2xl py-4 active:opacity-80"
              >
                <Text className="text-white text-center font-bold text-lg">Start Over</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Exit */}
          <TouchableOpacity onPress={reset} className="items-center py-2">
            <Text className="text-sm text-muted">← Choose different method</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
