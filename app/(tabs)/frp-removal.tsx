import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ScreenContainer } from "@/components/screen-container";

type FRPStep = "start" | "enable_debug" | "connect" | "processing" | "success" | "error";

interface StepInfo {
  title: string;
  description: string;
  action: string;
}

const steps: Record<FRPStep, StepInfo> = {
  start: {
    title: "Ready to Remove FRP",
    description:
      "This process will remove the Factory Reset Protection lock from your device. Make sure your device is connected via USB.",
    action: "Start Process",
  },
  enable_debug: {
    title: "Enable USB Debugging",
    description:
      "Go to Settings > Developer Options and enable USB Debugging. If you don't see Developer Options, tap Build Number 7 times in About Phone.",
    action: "Next",
  },
  connect: {
    title: "Connecting to Device",
    description: "Ensure your device is connected via USB and USB Debugging is enabled. Accept any permission prompts on your device.",
    action: "Connect",
  },
  processing: {
    title: "Processing...",
    description: "The FRP removal process is running. This may take a few minutes. Do not disconnect your device.",
    action: "Processing",
  },
  success: {
    title: "FRP Removed Successfully",
    description: "The Factory Reset Protection has been removed from your device. Your device will now reboot.",
    action: "Done",
  },
  error: {
    title: "Error Occurred",
    description:
      "An error occurred during the FRP removal process. Please check your device connection and try again.",
    action: "Retry",
  },
};

export default function FRPRemovalScreen() {
  const [currentStep, setCurrentStep] = React.useState<FRPStep>("start");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleAction = () => {
    if (currentStep === "start") {
      setCurrentStep("enable_debug");
    } else if (currentStep === "enable_debug") {
      setCurrentStep("connect");
    } else if (currentStep === "connect") {
      setIsProcessing(true);
      setCurrentStep("processing");
      // Simulate processing
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentStep("success");
      }, 3000);
    } else if (currentStep === "success") {
      setCurrentStep("start");
    } else if (currentStep === "error") {
      setCurrentStep("start");
    }
  };

  const stepInfo = steps[currentStep];
  const stepNumber = Object.keys(steps).indexOf(currentStep) + 1;
  const totalSteps = Object.keys(steps).length - 1;

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Remove FRP</Text>
            <Text className="text-sm text-muted">Factory Reset Protection Bypass</Text>
          </View>

          {/* Progress Indicator */}
          {currentStep !== "success" && currentStep !== "error" && (
            <View className="gap-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-xs font-semibold text-muted uppercase tracking-wide">
                  Progress
                </Text>
                <Text className="text-xs font-semibold text-muted">
                  {Math.min(stepNumber, totalSteps)} of {totalSteps}
                </Text>
              </View>
              <View className="h-2 bg-border rounded-full overflow-hidden flex-row">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <View
                    key={i}
                    className={`flex-1 ${i < stepNumber ? "bg-primary" : "bg-border"} ${
                      i > 0 ? "ml-1" : ""
                    }`}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Status Card */}
          <View
            className={`rounded-lg p-4 border ${
              currentStep === "success"
                ? "bg-success bg-opacity-10 border-success border-opacity-30"
                : currentStep === "error"
                  ? "bg-error bg-opacity-10 border-error border-opacity-30"
                  : currentStep === "processing"
                    ? "bg-warning bg-opacity-10 border-warning border-opacity-30"
                    : "bg-primary bg-opacity-10 border-primary border-opacity-30"
            }`}
          >
            <Text
              className={`text-lg font-bold ${
                currentStep === "success"
                  ? "text-success"
                  : currentStep === "error"
                    ? "text-error"
                    : currentStep === "processing"
                      ? "text-warning"
                      : "text-primary"
              }`}
            >
              {stepInfo.title}
            </Text>
          </View>

          {/* Instructions */}
          <View className="bg-surface rounded-lg p-4 border border-border">
            <Text className="text-sm leading-relaxed text-foreground">{stepInfo.description}</Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            onPress={handleAction}
            disabled={isProcessing}
            className={`rounded-lg p-4 active:opacity-80 ${
              isProcessing ? "bg-border opacity-50" : "bg-primary"
            }`}
          >
            <Text className="text-white text-center font-semibold">
              {isProcessing ? "Processing..." : stepInfo.action}
            </Text>
          </TouchableOpacity>

          {/* Warning */}
          {currentStep === "start" && (
            <View className="bg-warning bg-opacity-10 rounded-lg p-4 border border-warning border-opacity-30">
              <Text className="text-sm font-semibold text-foreground mb-2">Important</Text>
              <Text className="text-xs text-muted leading-relaxed">
                This process will remove FRP protection. Ensure you have the proper authorization to perform this action on the device.
              </Text>
            </View>
          )}

          {/* Success Message */}
          {currentStep === "success" && (
            <View className="bg-success bg-opacity-10 rounded-lg p-4 border border-success border-opacity-30">
              <Text className="text-sm font-semibold text-foreground mb-2">Success</Text>
              <Text className="text-xs text-muted leading-relaxed">
                FRP has been successfully removed. Your device will now reboot and you can set up a new account.
              </Text>
            </View>
          )}

          {/* Error Message */}
          {currentStep === "error" && (
            <View className="bg-error bg-opacity-10 rounded-lg p-4 border border-error border-opacity-30">
              <Text className="text-sm font-semibold text-foreground mb-2">Error</Text>
              <Text className="text-xs text-muted leading-relaxed">
                Please check your device connection, ensure USB Debugging is enabled, and try again.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
