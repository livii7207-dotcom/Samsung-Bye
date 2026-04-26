import { ScrollView, Text, View, TouchableOpacity, FlatList, TextInput } from "react-native";
import React from "react";
import { ScreenContainer } from "@/components/screen-container";

interface CSCOption {
  id: string;
  code: string;
  region: string;
  carrier: string;
}

const cscOptions: CSCOption[] = [
  { id: "1", code: "USA", region: "United States", carrier: "Generic" },
  { id: "2", code: "ATT", region: "United States", carrier: "AT&T" },
  { id: "3", code: "TMB", region: "United States", carrier: "T-Mobile" },
  { id: "4", code: "VZW", region: "United States", carrier: "Verizon" },
  { id: "5", code: "EUR", region: "Europe", carrier: "Generic" },
  { id: "6", code: "DBT", region: "Germany", carrier: "Deutsche Telekom" },
  { id: "7", code: "CHM", region: "China", carrier: "China Mobile" },
  { id: "8", code: "JPN", region: "Japan", carrier: "Generic" },
];

export default function CSCChangeScreen() {
  const [currentCSC, setCurrentCSC] = React.useState("USA");
  const [selectedCSC, setSelectedCSC] = React.useState<CSCOption | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const filteredCSCs = cscOptions.filter(
    (csc) =>
      csc.code.toLowerCase().includes(searchText.toLowerCase()) ||
      csc.region.toLowerCase().includes(searchText.toLowerCase()) ||
      csc.carrier.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleApplyCSC = () => {
    if (selectedCSC) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setCurrentCSC(selectedCSC.code);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        setSelectedCSC(null);
      }, 2000);
    }
  };

  return (
    <ScreenContainer className="p-6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">Change CSC</Text>
            <Text className="text-sm text-muted">Region and Carrier Settings</Text>
          </View>

          {/* Current CSC Display */}
          <View className="bg-surface rounded-lg p-4 border border-border">
            <Text className="text-xs text-muted uppercase tracking-wide mb-2">Current CSC</Text>
            <Text className="text-lg font-bold text-foreground">{currentCSC}</Text>
            <Text className="text-xs text-muted mt-2">
              {cscOptions.find((c) => c.code === currentCSC)?.region}
            </Text>
          </View>

          {/* Success Message */}
          {showSuccess && (
            <View className="bg-success bg-opacity-10 rounded-lg p-4 border border-success border-opacity-30">
              <Text className="text-sm font-semibold text-success">CSC Changed Successfully</Text>
              <Text className="text-xs text-muted mt-1">
                Your device CSC has been updated. The device may reboot.
              </Text>
            </View>
          )}

          {/* CSC Selection */}
          <View className="gap-3">
            <Text className="text-xs font-semibold text-foreground uppercase tracking-wide">
              Available CSCs
            </Text>

            {/* Search Input */}
            <TextInput
              className="bg-surface rounded-lg p-3 border border-border text-sm text-foreground"
              placeholder="Search CSC..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />

            {/* CSC List */}
            <View className="gap-2 max-h-64">
              {filteredCSCs.map((csc) => (
                <TouchableOpacity
                  key={csc.id}
                  onPress={() => setSelectedCSC(csc)}
                  className={`rounded-lg p-3 border active:opacity-80 ${
                    selectedCSC?.id === csc.id
                      ? "bg-primary bg-opacity-20 border-primary"
                      : "bg-surface border-border"
                  }`}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-foreground">{csc.code}</Text>
                      <Text className="text-xs text-muted mt-1">
                        {csc.region} • {csc.carrier}
                      </Text>
                    </View>
                    {selectedCSC?.id === csc.id && (
                      <View className="w-5 h-5 rounded-full bg-primary items-center justify-center">
                        <Text className="text-white font-bold text-xs">✓</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Apply Button */}
          <TouchableOpacity
            onPress={handleApplyCSC}
            disabled={!selectedCSC || isProcessing}
            className={`rounded-lg p-4 active:opacity-80 ${
              selectedCSC && !isProcessing ? "bg-primary" : "bg-border opacity-50"
            }`}
          >
            <Text className="text-white text-center font-semibold">
              {isProcessing ? "Applying..." : "Apply CSC"}
            </Text>
          </TouchableOpacity>

          {/* Warning */}
          <View className="bg-warning bg-opacity-10 rounded-lg p-4 border border-warning border-opacity-30">
            <Text className="text-sm font-semibold text-foreground mb-2">Important</Text>
            <Text className="text-xs text-muted leading-relaxed">
              Changing CSC will modify your device region and carrier settings. This may affect available features and services.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
