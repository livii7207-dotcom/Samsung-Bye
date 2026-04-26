import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ScreenContainer } from "@/components/screen-container";

type ResetStep = "warning" | "confirm" | "processing" | "success";

export default function FactoryResetScreen() {
  const [currentStep, setCurrentStep] = React.useState<ResetStep>("warning");
  const [confirmed, setConfirmed] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleStartReset = () => {
    if (confirmed) {
      setCurrentStep("processing");
      setIsProcessing(true);
      // Simulate reset process
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep("success");
      }, 4000);
    }
  };

  const handleReset = () => {
    setCurrentStep("warning");
    setConfirmed(false);
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Factory Reset</Text>
            <Text className="text-sm text-muted">Restore device to factory settings</Text>
          </View>

          {currentStep === "warning" && (
            <>
              {/* Warning Card */}
              <View className="bg-error bg-opacity-10 rounded-lg p-4 border border-error border-opacity-30">
                <Text className="text-lg font-bold text-error mb-3">Warning</Text>
                <Text className="text-sm text-foreground leading-relaxed">
                  Factory reset will erase all data on your device including:
                </Text>
                <View className="mt-3 gap-2">
                  <Text className="text-sm text-foreground">• All apps and app data</Text>
                  <Text className="text-sm text-foreground">• Photos and videos</Text>
                  <Text className="text-sm text-foreground">• Messages and contacts</Text>
                  <Text className="text-sm text-foreground">• Settings and preferences</Text>
                </View>
              </View>

              {/* Confirmation Checkbox */}
              <TouchableOpacity
                onPress={() => setConfirmed(!confirmed)}
                className="flex-row items-center gap-3 p-3 bg-surface rounded-lg border border-border active:opacity-80"
              >
                <View
                  className={`w-5 h-5 rounded border-2 items-center justify-center ${
                    confirmed
                      ? "bg-primary border-primary"
                      : "border-border"
                  }`}
                >
                  {confirmed && <Text className="text-white font-bold text-sm">✓</Text>}
                </View>
                <Text className="text-sm text-foreground flex-1">
                  I understand that all data will be erased
                </Text>
              </TouchableOpacity>

              {/* Start Button */}
              <TouchableOpacity
                onPress={handleStartReset}
                disabled={!confirmed}
                className={`rounded-lg p-4 active:opacity-80 ${
                  confirmed ? "bg-error" : "bg-border opacity-50"
                }`}
              >
                <Text className="text-white text-center font-semibold">
                  Start Factory Reset
                </Text>
              </TouchableOpacity>

              {/* Info */}
              <View className="bg-warning bg-opacity-10 rounded-lg p-4 border border-warning border-opacity-30">
                <Text className="text-sm font-semibold text-foreground mb-2">Note</Text>
                <Text className="text-xs text-muted leading-relaxed">
                  This process may take several minutes. Do not disconnect your device during the reset.
                </Text>
              </View>
            </>
          )}

          {currentStep === "processing" && (
            <>
              {/* Processing Card */}
              <View className="bg-warning bg-opacity-10 rounded-lg p-4 border border-warning border-opacity-30">
                <Text className="text-lg font-bold text-warning mb-2">Factory Reset in Progress</Text>
                <Text className="text-sm text-foreground">
                  Please do not disconnect your device. This may take a few minutes...
                </Text>
              </View>

              {/* Progress Indicator */}
              <View className="gap-2">
                <Text className="text-xs font-semibold text-muted uppercase tracking-wide">
                  Progress
                </Text>
                <View className="h-3 bg-border rounded-full overflow-hidden">
                  <View className="h-full bg-warning w-1/2" />
                </View>
              </View>

              {/* Status */}
              <View className="bg-surface rounded-lg p-4 border border-border">
                <Text className="text-sm text-foreground text-center">
                  Erasing device data...
                </Text>
              </View>
            </>
          )}

          {currentStep === "success" && (
            <>
              {/* Success Card */}
              <View className="bg-success bg-opacity-10 rounded-lg p-4 border border-success border-opacity-30">
                <Text className="text-lg font-bold text-success mb-2">Factory Reset Complete</Text>
                <Text className="text-sm text-foreground">
                  Your device has been successfully reset to factory settings. It will now reboot and you can set up a new account.
                </Text>
              </View>

              {/* Done Button */}
              <TouchableOpacity
                onPress={handleReset}
                className="bg-primary rounded-lg p-4 active:opacity-80"
              >
                <Text className="text-white text-center font-semibold">Done</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
