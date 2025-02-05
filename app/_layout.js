import "../global.css";
import { Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { View } from "react-native";

export default function RootLayout() {
  return (
    <View className="flex-1 bg-white">
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}
