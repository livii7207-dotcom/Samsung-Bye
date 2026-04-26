import { ScrollView, Text, View, TouchableOpacity, Clipboard } from "react-native";
import React from "react";
import { ScreenContainer } from "@/components/screen-container";

interface DeviceDetails {
  model: string;
  androidVersion: string;
  buildNumber: string;
  serialNumber: string;
  frpStatus: "Locked" | "Unlocked";
  batteryLevel: number;
  storageUsed: string;
  storageTotal: string;
}

export default function DeviceInfoScreen() {
  const [device, setDevice] = React.useState<DeviceDetails>({
    model: "Samsung Galaxy S21",
    androidVersion: "13",
    buildNumber: "TP1A.220624.014",
    serialNumber: "RF8M70XXXXX",
    frpStatus: "Locked",
    batteryLevel: 85,
    storageUsed: "45.2 GB",
    storageTotal: "128 GB",
  });

  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopyToClipboard = (text: string, label: string) => {
    Clipboard.setString(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleRefresh = () => {
    console.log("Refreshing device info...");
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Device Information</Text>
            <Text className="text-sm text-muted">{device.model}</Text>
          </View>

          {/* FRP Status Card */}
          <View
            className={`rounded-lg p-4 border ${
              device.frpStatus === "Locked"
                ? "bg-error bg-opacity-10 border-error border-opacity-30"
                : "bg-success bg-opacity-10 border-success border-opacity-30"
            }`}
          >
            <Text className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">
              FRP Status
            </Text>
            <Text
              className={`text-lg font-bold ${
                device.frpStatus === "Locked" ? "text-error" : "text-success"
              }`}
            >
              {device.frpStatus}
            </Text>
          </View>

          {/* Device Details */}
          <View className="gap-3">
            <Text className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Device Details
            </Text>

            {/* Model */}
            <TouchableOpacity
              onPress={() => handleCopyToClipboard(device.model, "Model")}
              className="bg-surface rounded-lg p-3 border border-border active:opacity-80"
            >
              <Text className="text-xs text-muted uppercase tracking-wide mb-1">Model</Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-foreground flex-1">
                  {device.model}
                </Text>
                <Text className="text-xs text-muted">
                  {copied === "Model" ? "Copied" : "Copy"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Android Version */}
            <TouchableOpacity
              onPress={() => handleCopyToClipboard(device.androidVersion, "Android Version")}
              className="bg-surface rounded-lg p-3 border border-border active:opacity-80"
            >
              <Text className="text-xs text-muted uppercase tracking-wide mb-1">
                Android Version
              </Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-foreground flex-1">
                  {device.androidVersion}
                </Text>
                <Text className="text-xs text-muted">
                  {copied === "Android Version" ? "Copied" : "Copy"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Build Number */}
            <TouchableOpacity
              onPress={() => handleCopyToClipboard(device.buildNumber, "Build Number")}
              className="bg-surface rounded-lg p-3 border border-border active:opacity-80"
            >
              <Text className="text-xs text-muted uppercase tracking-wide mb-1">Build Number</Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-foreground flex-1 font-mono">
                  {device.buildNumber}
                </Text>
                <Text className="text-xs text-muted">
                  {copied === "Build Number" ? "Copied" : "Copy"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Serial Number */}
            <TouchableOpacity
              onPress={() => handleCopyToClipboard(device.serialNumber, "Serial Number")}
              className="bg-surface rounded-lg p-3 border border-border active:opacity-80"
            >
              <Text className="text-xs text-muted uppercase tracking-wide mb-1">
                Serial Number
              </Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-foreground flex-1 font-mono">
                  {device.serialNumber}
                </Text>
                <Text className="text-xs text-muted">
                  {copied === "Serial Number" ? "Copied" : "Copy"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* System Status */}
          <View className="gap-3">
            <Text className="text-xs font-semibold text-foreground uppercase tracking-wide">
              System Status
            </Text>

            {/* Battery */}
            <View className="bg-surface rounded-lg p-3 border border-border">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-xs text-muted uppercase tracking-wide">Battery Level</Text>
                <Text className="text-sm font-semibold text-foreground">{device.batteryLevel}%</Text>
              </View>
              <View className="h-2 bg-border rounded-full overflow-hidden">
                <View
                  className="h-full bg-success"
                  style={{ width: `${device.batteryLevel}%` }}
                />
              </View>
            </View>

            {/* Storage */}
            <View className="bg-surface rounded-lg p-3 border border-border">
              <View className="flex-row items-center justify-between mb-1">
                <Text className="text-xs text-muted uppercase tracking-wide">Storage</Text>
                <Text className="text-sm font-semibold text-foreground">
                  {device.storageUsed} / {device.storageTotal}
                </Text>
              </View>
              <Text className="text-xs text-muted">
                {Math.round((45.2 / 128) * 100)}% used
              </Text>
            </View>
          </View>

          {/* Refresh Button */}
          <TouchableOpacity
            onPress={handleRefresh}
            className="bg-primary rounded-lg p-3 active:opacity-80 mt-4"
          >
            <Text className="text-white text-center font-semibold">Refresh Information</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
