import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { deleteApp } from "firebase/app";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../../firebaseConfig";

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const router = useRouter();

  const clearFirebaseData = async () => {
    try {
      // Удаляем приложение и разлогиневаем Firebase (очищает кэш)
      await signOut(auth);
      await deleteApp(auth.app);

      console.log("Firebase кэш очищен");
    } catch (error) {
      console.error("Ошибка очистки Firebase:", error);
    }
  };

  const clearStorageOnFirstLaunch = async () => {
    const firstLaunch = await AsyncStorage.getItem("firstLaunch");

    if (!firstLaunch) {
      await clearFirebaseData(); // Очищаем Firebase
      await AsyncStorage.clear(); // Очищаем AsyncStorage
      await AsyncStorage.setItem("firstLaunch", "true");

      console.log("Полный сброс данных выполнен");
    }
  };

  // useEffect(() => {
  //   clearStorageOnFirstLaunch();
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      ring1padding.value = 0;
      ring2padding.value = 0;
      ring1padding.value = withSpring(ring1padding.value + hp(4.5));
      ring2padding.value = withSpring(ring2padding.value + hp(5));
    }, 300);
    setTimeout(() => {
      router.replace("/home");
    }, 2500);
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
