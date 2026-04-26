import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { ScreenContainer } from "@/components/screen-container";

/**
 * Home Screen - NativeWind Example
 *
 * This template uses NativeWind (Tailwind CSS for React Native).
 * You can use familiar Tailwind classes directly in className props.
 *
 * Key patterns:
 * - Use `className` instead of `style` for most styling
 * - Theme colors: use tokens directly (bg-background, text-foreground, bg-primary, etc.); no dark: prefix needed
 * - Responsive: standard Tailwind breakpoints work on web
 * - Custom colors defined in tailwind.config.js
 */
export default function HomeScreen() {
  const [deviceConnected, setDeviceConnected] = React.useState(false);
  const [deviceModel, setDeviceModel] = React.useState("No Device");

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header Section */}
          <View className="items-center gap-2 mb-4">
            <Text className="text-3xl font-bold text-foreground">SanFw FRP Tool</Text>
            <Text className="text-sm text-muted">Device Management Utility</Text>
          </View>

          {/* Device Status Card */}
          <View className="bg-surface rounded-2xl p-4 border border-border">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-xs text-muted uppercase tracking-wide mb-1">Device Status</Text>
                <Text className="text-lg font-semibold text-foreground">{deviceModel}</Text>
              </View>
              <View className={`w-3 h-3 rounded-full ${deviceConnected ? 'bg-success' : 'bg-error'}`} />
            </View>
          </View>

          {/* Quick Actions Grid */}
          <View className="gap-4">
            <Text className="text-sm font-semibold text-foreground uppercase tracking-wide">Quick Actions</Text>
            
            {/* Row 1 */}
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 bg-primary rounded-xl p-4 active:opacity-80">
                <Text className="text-white text-center font-semibold text-sm">Remove FRP</Text>
                <Text className="text-white text-center text-xs opacity-80 mt-1">Bypass lock</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-primary rounded-xl p-4 active:opacity-80">
                <Text className="text-white text-center font-semibold text-sm">Factory Reset</Text>
                <Text className="text-white text-center text-xs opacity-80 mt-1">Full reset</Text>
              </TouchableOpacity>
            </View>

            {/* Row 2 */}
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 bg-surface rounded-xl p-4 border border-border active:opacity-80">
                <Text className="text-foreground text-center font-semibold text-sm">Change CSC</Text>
                <Text className="text-muted text-center text-xs mt-1">Region/Carrier</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-surface rounded-xl p-4 border border-border active:opacity-80">
                <Text className="text-foreground text-center font-semibold text-sm">Device Info</Text>
                <Text className="text-muted text-center text-xs mt-1">View details</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Actions */}
          <View className="gap-3 mt-4">
            <Text className="text-sm font-semibold text-foreground uppercase tracking-wide">Recent Actions</Text>
            <View className="bg-surface rounded-xl p-3 border border-border">
              <Text className="text-xs text-muted">No recent actions</Text>
            </View>
          </View>

          {/* Connection Instructions */}
          {!deviceConnected && (
            <View className="bg-warning bg-opacity-10 rounded-xl p-4 border border-warning border-opacity-30 mt-4">
              <Text className="text-sm font-semibold text-foreground mb-2">Connect Device</Text>
              <Text className="text-xs text-muted leading-relaxed">
                Connect your Android device via USB and enable USB debugging to get started.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
