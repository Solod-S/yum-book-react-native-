import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { SignIn, SignUp } from "../components";
import Animated, { FadeIn } from "react-native-reanimated";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Auth() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("signIn");
  useEffect(() => {
    return setActiveTab("signIn");
  }, []);
  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <Animated.View
        entering={FadeIn.delay(200).duration(1000)}
        className="w-full absolute flex-row justify-between items-center pt-5 z-10"
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full ml-5"
        >
          <FontAwesome
            name="chevron-circle-left"
            size={hp(5.5)}
            color="#EF4444"
          />
        </TouchableOpacity>
      </Animated.View>
      {activeTab === "signIn" ? (
        <SignIn setActiveTab={setActiveTab} router={router} />
      ) : (
        <SignUp setActiveTab={setActiveTab} router={router} />
      )}
    </SafeAreaView>
  );
}
