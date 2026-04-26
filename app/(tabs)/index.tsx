import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer className="flex-1 items-center justify-center p-6">
      <Text className="text-3xl font-bold text-foreground mb-16">Samsung Bye</Text>
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/frp-removal")}
        className="bg-primary rounded-2xl w-full py-6 active:opacity-80"
      >
        <Text className="text-white text-center text-2xl font-bold">FRP Bypass</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
}
