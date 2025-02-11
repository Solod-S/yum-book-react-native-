import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";

import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { CustomKeyboardView } from "./customKeyboardView";
import { Loading } from "./loading";

import Octicons from "@expo/vector-icons/Octicons";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../context/authContext";
import Toast from "react-native-toast-message";

export function SignUp({ setActiveTab, router }) {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !userNameRef.current) {
      // Alert.alert("Sign up", "Please fill all the fields");
      Toast.show({
        type: "error",
        position: "top",
        text1: "Sign Up Failed",
        text2: "Please fill all the fields",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
      return;
    }

    // registration process
    setLoading(true);
    const response = await register(
      emailRef.current,
      passwordRef.current,
      userNameRef.current
    );
    setLoading(false);
    // console.log(`got response`, response);
    if (!response.success) {
      // Alert.alert("Sign up", response.message);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Sign Up Failed",
        text2: response.message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    }
    router.replace("/home");
    setTimeout(() => {
      Toast.show({
        type: "success",
        position: "top",
        text1: "Sign Up Successful",
        text2: "You have successfully logged in.",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 50,
      });
    }, 500);
  };
  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View
        style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
        className="flex-1 gap-12"
      >
        <View className="item-center">
          {/* Sign in image */}
          <Image
            style={{ width: wp(100), height: hp(25) }}
            resizeMode="contain"
            source={require("../assets/images/sign_up.png")}
          />
        </View>
        <View className="gap-10">
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-800"
          >
            Sign Up
          </Text>
          {/* Inputs */}
          <View className="gap-4">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Feather name="user" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => (userNameRef.current = value)}
                style={{ fontSize: hp(2) }}
                placeholder="Username"
                placeholderTextColor={"gray"}
                className="flex-1 font-semibold text-neutral-700"
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Octicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => (emailRef.current = value)}
                style={{ fontSize: hp(2) }}
                placeholder="Email Address"
                placeholderTextColor={"gray"}
                className="flex-1 font-semibold text-neutral-700"
              />
            </View>

            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
            >
              <Pressable
                onPress={() => setSecureTextEntry(prevState => !prevState)}
              >
                <Octicons name="lock" size={hp(2.7)} color="gray" />
              </Pressable>
              <TextInput
                onChangeText={value => (passwordRef.current = value)}
                style={{ fontSize: hp(2) }}
                placeholder="Password"
                secureTextEntry={secureTextEntry}
                placeholderTextColor={"gray"}
                className="flex-1 font-semibold text-neutral-700"
              />
            </View>

            {/* Submit btn */}
            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={hp(6.5)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleRegister}
                  style={{ height: hp(6.5) }}
                  className="bg-red-500 rounded-xl justify-center items-center"
                >
                  <Text
                    style={{ fontSize: hp(2.7) }}
                    className="text-white font-bold tracking-wider"
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* sign up text */}
            <View className="flex-row justify-center">
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-neutral-500"
              >
                Already have an account?{" "}
              </Text>
              <Pressable>
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-red-500"
                  onPress={() => setActiveTab("signIn")}
                >
                  Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
