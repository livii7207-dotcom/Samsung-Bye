import { ScrollView, Text, View, TouchableOpacity, Switch } from "react-native";
import React from "react";
import { ScreenContainer } from "@/components/screen-container";

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [logging, setLogging] = React.useState(true);

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Settings</Text>
            <Text className="text-sm text-muted">App Configuration</Text>
          </View>

          {/* Appearance Section */}
          <View className="gap-3">
            <Text className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Appearance
            </Text>

            <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">Dark Mode</Text>
                <Text className="text-xs text-muted mt-1">Use dark theme</Text>
              </View>
              <Switch value={darkMode} onValueChange={setDarkMode} />
            </View>
          </View>

          {/* Notifications Section */}
          <View className="gap-3">
            <Text className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Notifications
            </Text>

            <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">Operation Alerts</Text>
                <Text className="text-xs text-muted mt-1">Notify on operation completion</Text>
              </View>
              <Switch value={notifications} onValueChange={setNotifications} />
            </View>
          </View>

          {/* Logging Section */}
          <View className="gap-3">
            <Text className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Logging
            </Text>

            <View className="bg-surface rounded-lg p-4 border border-border flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-sm font-semibold text-foreground">Enable Logging</Text>
                <Text className="text-xs text-muted mt-1">Save operation logs</Text>
              </View>
              <Switch value={logging} onValueChange={setLogging} />
            </View>

            <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border active:opacity-80">
              <Text className="text-sm font-semibold text-foreground">View Logs</Text>
              <Text className="text-xs text-muted mt-1">View operation history</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border active:opacity-80">
              <Text className="text-sm font-semibold text-foreground">Clear Cache</Text>
              <Text className="text-xs text-muted mt-1">Clear temporary files</Text>
            </TouchableOpacity>
          </View>

          {/* About Section */}
          <View className="gap-3">
            <Text className="text-xs font-semibold text-foreground uppercase tracking-wide">
              About
            </Text>

            <View className="bg-surface rounded-lg p-4 border border-border">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-sm font-semibold text-foreground">App Version</Text>
                <Text className="text-sm text-muted">1.0.0</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-foreground">Build Number</Text>
                <Text className="text-sm text-muted">20260426</Text>
              </View>
            </View>

            <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border active:opacity-80">
              <Text className="text-sm font-semibold text-foreground">Check for Updates</Text>
              <Text className="text-xs text-muted mt-1">Latest version installed</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border active:opacity-80">
              <Text className="text-sm font-semibold text-foreground">Privacy Policy</Text>
              <Text className="text-xs text-muted mt-1">View our privacy policy</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border active:opacity-80">
              <Text className="text-sm font-semibold text-foreground">Terms of Service</Text>
              <Text className="text-xs text-muted mt-1">View terms and conditions</Text>
            </TouchableOpacity>
          </View>

          {/* Support Section */}
          <View className="gap-3">
            <Text className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Support
            </Text>

            <TouchableOpacity className="bg-primary rounded-lg p-4 active:opacity-80">
              <Text className="text-white text-center font-semibold">Contact Support</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface rounded-lg p-4 border border-border active:opacity-80">
              <Text className="text-sm font-semibold text-foreground">Help & Guides</Text>
              <Text className="text-xs text-muted mt-1">View tutorials and FAQs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
