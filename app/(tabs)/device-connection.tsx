import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ScreenContainer } from "@/components/screen-container";

interface Device {
  id: string;
  model: string;
  androidVersion: string;
  serialNumber: string;
  connected: boolean;
}

export default function DeviceConnectionScreen() {
  const [devices, setDevices] = React.useState<Device[]>([
    {
      id: "1",
      model: "Samsung Galaxy S21",
      androidVersion: "13",
      serialNumber: "RF8M70XXXXX",
      connected: true,
    },
  ]);

  const handleRefresh = () => {
    console.log("Scanning for devices...");
  };

  const handleSelectDevice = (device: Device) => {
    console.log("Selected device:", device);
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Connected Devices</Text>
            <Text className="text-sm text-muted">Select a device to manage</Text>
          </View>

          {/* Refresh Button */}
          <TouchableOpacity
            onPress={handleRefresh}
            className="bg-primary rounded-lg p-3 active:opacity-80"
          >
            <Text className="text-white text-center font-semibold">Scan for Devices</Text>
          </TouchableOpacity>

          {/* Device List */}
          <View className="gap-3">
            <Text className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Available Devices
            </Text>
            {devices.length > 0 ? (
              <View className="gap-2">
                {devices.map((device) => (
                  <TouchableOpacity
                    key={device.id}
                    onPress={() => handleSelectDevice(device)}
                    className="bg-surface rounded-lg p-4 border border-border active:opacity-80"
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Text className="text-base font-semibold text-foreground flex-1">
                        {device.model}
                      </Text>
                      <View className="w-2 h-2 rounded-full bg-success" />
                    </View>
                    <View className="gap-1">
                      <Text className="text-xs text-muted">
                        Android {device.androidVersion}
                      </Text>
                      <Text className="text-xs text-muted font-mono">
                        {device.serialNumber}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View className="bg-surface rounded-lg p-4 border border-border items-center">
                <Text className="text-sm text-muted">No devices found</Text>
                <Text className="text-xs text-muted mt-2">
                  Connect an Android device via USB
                </Text>
              </View>
            )}
          </View>

          {/* Connection Instructions */}
          <View className="bg-warning bg-opacity-10 rounded-lg p-4 border border-warning border-opacity-30">
            <Text className="text-sm font-semibold text-foreground mb-2">Connection Tips</Text>
            <Text className="text-xs text-muted leading-relaxed">
              1. Connect device via USB cable{"\n"}2. Enable USB debugging in Developer Options{"\n"}3. Tap "Scan for Devices" to refresh
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
