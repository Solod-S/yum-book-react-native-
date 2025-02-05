import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { View, Text, Image } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      ring1padding.value = 0;
      ring2padding.value = 0;
      ring1padding.value = withSpring(ring1padding.value + hp(4.5));
      ring2padding.value = withSpring(ring2padding.value + hp(5));
    }, 300);
    setTimeout(() => {
      router.replace("/home"); // Вызов без лишней стрелочной функции
    }, 2500);
    // return (cleanUp = () => {});
  }, []);
  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-red-500">
      <StatusBar style="light" />

      <Animated.View
        style={{ padding: ring1padding }}
        className="bg-white/20 rounded-full  mb-6"
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ring2padding }}
        >
          <Image
            source={require("../../assets/images/welcome.png")}
            style={{ width: hp(21), height: hp(21) }}
          />
        </Animated.View>
      </Animated.View>
      <View className="flex items-center space-y-2">
        <Text
          style={{ fontSize: hp(6) }}
          className="font-bold text-white tracking-widest"
        >
          Yum-book
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="font-medium text-white tracking-widest"
        >
          Cook. Taste. Enjoy.
        </Text>
      </View>
    </View>
  );
}
