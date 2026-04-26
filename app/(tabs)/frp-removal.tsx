import { ScrollView, Text, View, TouchableOpacity, Linking } from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";
import { ScreenContainer } from "@/components/screen-container";

// ← Replace this with the real direct .apk download URL
const APK_URL = "https://REPLACE_WITH_YOUR_APK_URL.apk";
const APK_FILENAME = "frp-bypass.apk";

type Status = "idle" | "downloading" | "installing" | "done" | "error";

export default function FRPRemovalScreen() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [progress, setProgress] = React.useState(0);
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleDownloadAndInstall = async () => {
    setStatus("downloading");
    setProgress(0);
    setErrorMsg("");

    try {
      const fileUri = FileSystem.cacheDirectory + APK_FILENAME;

      const downloadResumable = FileSystem.createDownloadResumable(
        APK_URL,
        fileUri,
        {},
        ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
          if (totalBytesExpectedToWrite > 0) {
            setProgress(totalBytesWritten / totalBytesExpectedToWrite);
          }
        }
      );

      const result = await downloadResumable.downloadAsync();
      if (!result || result.status !== 200) throw new Error("Download failed");

      setStatus("installing");

      const contentUri = await FileSystem.getContentUriAsync(result.uri);
      await Linking.openURL(contentUri);

      setStatus("done");
    } catch (e: any) {
      setErrorMsg(e?.message ?? "Something went wrong");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setProgress(0);
    setErrorMsg("");
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">FRP Bypass</Text>
            <Text className="text-sm text-muted">Download and install bypass tool</Text>
          </View>

          {status === "idle" && (
            <View className="bg-surface rounded-xl p-5 border border-border gap-3">
              <Text className="text-base text-foreground leading-relaxed">
                Tap the button below to download the FRP bypass tool and install it on this device.
              </Text>
              <Text className="text-xs text-muted leading-relaxed">
                You may be asked to allow installation from unknown sources — tap Allow when prompted.
              </Text>
            </View>
          )}

          {status === "downloading" && (
            <View className="bg-surface rounded-xl p-5 border border-border gap-3">
              <Text className="text-base font-semibold text-foreground">Downloading...</Text>
              <View className="h-3 bg-border rounded-full overflow-hidden">
                <View
                  className="h-3 bg-primary rounded-full"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </View>
              <Text className="text-sm text-muted text-center">{Math.round(progress * 100)}%</Text>
            </View>
          )}

          {status === "installing" && (
            <View className="bg-primary bg-opacity-10 rounded-xl p-5 border border-primary border-opacity-30">
              <Text className="text-base font-semibold text-foreground">Opening installer...</Text>
              <Text className="text-sm text-muted mt-2">
                Tap Install when the system prompt appears.
              </Text>
            </View>
          )}

          {status === "done" && (
            <View className="bg-success bg-opacity-10 rounded-xl p-5 border border-success border-opacity-30">
              <Text className="text-base font-semibold text-foreground">Installed!</Text>
              <Text className="text-sm text-muted mt-2">
                Open the bypass tool app to continue the FRP removal process.
              </Text>
            </View>
          )}

          {status === "error" && (
            <View className="bg-error bg-opacity-10 rounded-xl p-5 border border-error border-opacity-30">
              <Text className="text-base font-semibold text-foreground">Failed</Text>
              <Text className="text-sm text-muted mt-2">{errorMsg}</Text>
            </View>
          )}

          {(status === "idle" || status === "error") && (
            <TouchableOpacity
              onPress={status === "error" ? reset : handleDownloadAndInstall}
              className="bg-primary rounded-2xl w-full py-5 active:opacity-80"
            >
              <Text className="text-white text-center text-xl font-bold">
                {status === "error" ? "Try Again" : "Download & Install"}
              </Text>
            </TouchableOpacity>
          )}

          {status === "done" && (
            <TouchableOpacity
              onPress={reset}
              className="bg-surface rounded-2xl w-full py-5 border border-border active:opacity-80"
            >
              <Text className="text-foreground text-center text-xl font-bold">Start Over</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
