import "../global.css";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { AuthContextProvider, useAuth } from "@/context/authContext";

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MenuProvider>
        <View className="flex-1 bg-white">
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="recipe"
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="auth"
              options={{
                presentation: "modal",
                headerShown: false,
              }}
            />
          </Stack>
          <Toast />
          <StatusBar style="auto" />
        </View>
      </MenuProvider>
    </AuthContextProvider>
  );
}
