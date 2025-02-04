import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { Image } from "expo-image";

export default function HomeScreen() {
  return (
    <SafeAreaView edges={["top"]}>
      <StatusBar style="dark" />
      {/* <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
        className="space-y-6 pt-14"
      /> */}

      {/* Avatar and bell icon */}
      <View className="mx-4 flex-row justify-between items-center mb-2">
        <Image
          style={{ height: hp(5), width: hp(5) }}
          source={require("../../assets/images/avatar.png")}
        />
        <FontAwesome name="bell-o" size={hp(4)} color="gray" />
      </View>
      {/* Greating and punchline */}
      <View className="mx-4 space-y-2 mb-2">
        <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
          Hello, Serg
        </Text>
        <View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            Make your food,
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(3.8) }}
          className="font-semibold text-neutral-600"
        >
          stay at <Text className="text-red-500">home</Text>
        </Text>
      </View>
      {/* search bar */}
      <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
        <TextInput
          placeholder="Search any recipe"
          placeholderTextColor={"gray"}
          style={{ fontSize: hp(1.7) }}
          className="flex-1 text-base mb-1 pl-3 tracking-wider"
        />
      </View>
    </SafeAreaView>
  );
}
