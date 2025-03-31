import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { Image } from "expo-image";
import { CustomMenuItems } from "./customMenuItems";
import { Divider } from "./divider";
import { Categories } from "./categories";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export function Header({
  searchQueryRef,
  handleChangeCategory,
  handleSearch,
  categories,
  state,
}) {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <>
      {/* avatar and bell icon */}
      {isAuthenticated && user ? (
        <View className=" flex-row justify-between items-center">
          <Text
            style={{ fontSize: hp(1.7) }}
            className="text-neutral-600 font-semibold"
          >
            Hello {user?.username ? `, ${user?.username}` : ""}
          </Text>
          <View
            style={{
              borderRadius: hp(5) / 2,
              overflow: "hidden",
            }}
          >
            <Menu>
              <MenuTrigger
                style={{
                  zIndex: 51,
                }}
              >
                <Image
                  source={require("../assets/images/avatar.png")}
                  style={{
                    height: hp(5),
                    width: hp(5),
                  }}
                />
              </MenuTrigger>

              <MenuOptions
                optionsContainerStyle={{
                  shadowColor: "black",
                  shadowOpacity: 0.3,
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 5,
                  borderWidth: 0.1,
                  borderRadius: 10,
                  width: 180,
                  marginTop: 35,
                  marginLeft: -20,
                }}
              >
                <CustomMenuItems
                  text="Log Out"
                  action={async () => {
                    await logout();
                    Toast.show({
                      type: "success",
                      position: "top",
                      text1: "Logged Out",
                      text2: "You have been successfully logged out.",
                      visibilityTime: 2000,
                      autoHide: true,
                      topOffset: 50,
                    });
                  }}
                  value={null}
                  icon={
                    <MaterialCommunityIcons
                      name="logout"
                      size={hp(2)}
                      color="#737373"
                    />
                  }
                />
                <Divider />
              </MenuOptions>
            </Menu>
          </View>
        </View>
      ) : (
        <View className=" flex-row justify-end items-center">
          <Menu>
            <MenuTrigger style={{ zIndex: 51 }}>
              <Entypo name="menu" size={34} color="black" />
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                shadowColor: "black",
                shadowOpacity: 0.3,
                shadowOffset: { width: 0, height: 0 },
                shadowRadius: 5,
                borderWidth: 0.1,
                borderRadius: 10,
                width: 180,
                marginTop: 35,
                marginLeft: -20,
              }}
            >
              <CustomMenuItems
                text="Auth"
                action={() => router.push("/auth")}
                value={null}
                icon={<FontAwesome5 name="user" size={hp(2)} color="#737373" />}
              />
              {/* <Divider /> */}
            </MenuOptions>
          </Menu>
        </View>
      )}

      {/* greetings and punchline */}

      <View className=" space-y-2 mt-2 mb-4">
        <Text
          style={{ fontSize: hp(3.8) }}
          className="font-bold text-neutral-600"
        >
          Get inspired for your next <Text className="text-red-500">meal!</Text>
        </Text>
      </View>

      <View className=" flex-row items-center rounded-full bg-black/5 p-[6px] mb-4">
        <TextInput
          placeholder="Search any recipe"
          placeholderTextColor="gray"
          defaultValue={searchQueryRef.current}
          onChangeText={text => {
            searchQueryRef.current = text;
          }}
          style={{ fontSize: hp(1.7) }}
          className="flex-1 text-base mb-1 pl-3 tracking-wider"
        />
        <TouchableOpacity
          onPress={() => handleSearch()}
          className="bg-white rounded-full p-3"
        >
          <FontAwesome name="search" size={hp(4)} color="gray" />
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <Categories
          handleChangeCategory={handleChangeCategory}
          categories={categories}
          activeCategory={state.activeCategory}
        />
      </View>
    </>
  );
}
