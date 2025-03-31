import { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Categories, Recipes, CustomMenuItems, Divider } from "@/components";
import Toast from "react-native-toast-message";
import { Image } from "expo-image";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/authContext";
import { getFavoriteRecipes } from "../../helpers";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const { isAuthenticated, logout, user } = useAuth();
  const router = useRouter();
  const [state, setState] = useState({
    activeCategory: "Beef",
    meals: [],
  });

  const [categories, setCategories] = useState([]);
  const searchQueryRef = useRef("");

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response.data?.categories) {
        const favorites = {
          idCategory: "0",
          strCategory: "Favorites",
          strCategoryThumb:
            "https://res.cloudinary.com/dkef1oqnp/image/upload/v1739120920/u2fawtesaxibhioo7eun.png",
          strCategoryDescription: "",
        };
        setCategories([favorites, ...response.data.categories]);
      }
    } catch (error) {
      console.log("Error in getCategories:", error);
    }
  };

  const getFavorites = async () => {
    try {
      const data = await getFavoriteRecipes();
      setState(prev => ({ activeCategory: "Favorites", meals: data }));
    } catch (error) {
      console.log("Error in getFavorites:", error);
    }
  };

  const getMeals = async category => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response.data?.meals) {
        setState(prev => ({ ...prev, meals: response.data.meals }));
      }
    } catch (error) {
      console.log("Error in getRecipes:", error);
    }
  };

  const handleChangeCategory = async category => {
    if (category !== state.activeCategory) {
      try {
        if (category === "Favorites") {
          await getFavorites();
        } else {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
          );
          const meals = response.data?.meals || [];

          setState(prev => ({
            ...prev,
            activeCategory: category,
            meals,
          }));
          searchQueryRef.current = "";
        }
      } catch (error) {
        console.log("Error in getMeals:", error);
      }
    }
  };

  const handleSearch = async () => {
    const query = searchQueryRef.current.trim();

    if (query.length === 0) {
      Toast.show({
        type: "info",
        position: "top",
        text1: "Enter a search query",
        text2: "The search field cannot be empty.",
        visibilityTime: 1500,
        autoHide: true,
        bottomOffset: 50,
      });
      return;
    }

    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const meals = response.data?.meals || [];

      if (meals.length === 0) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "No meals found",
          text2: `No results for "${query}". Try a different search.`,
          visibilityTime: 2000,
          autoHide: true,
          bottomOffset: 50,
        });
        return;
      }

      setState(prev => ({
        ...prev,
        meals,
      }));

      Toast.show({
        type: "success",
        position: "top",
        text1: "Search successful",
        text2: `${meals.length} meals found`,
        visibilityTime: 1500,
        autoHide: true,
        bottomOffset: 50,
      });
    } catch (error) {
      console.log("Error in handleSearch:", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Search error",
        text2: "Could not complete the search. Please try again later.",
        visibilityTime: 2000,
        autoHide: true,
        bottomOffset: 50,
      });
    }
  };

  useEffect(() => {
    getCategories();
    getMeals(state.activeCategory);
  }, []);

  useEffect(() => {
    if (isFocused && state.activeCategory === "Favorites") getFavorites();
  }, [isFocused, user]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <StatusBar style="dark" />
      <FlatList
        data={[]}
        keyExtractor={() => "dummy"}
        ListHeaderComponent={() => (
          <>
            {/* avatar and bell icon */}
            {isAuthenticated ? (
              <View className="mx-4 flex-row justify-between items-center">
                <Text
                  style={{ fontSize: hp(1.7) }}
                  className="text-neutral-600 font-semibold"
                >
                  Hello {user.username ? `, ${user.username}` : ""}
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
                        source={require("../../assets/images/avatar.png")}
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
              <View className="mx-4 flex-row justify-end items-center">
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
                      icon={
                        <FontAwesome5
                          name="user"
                          size={hp(2)}
                          color="#737373"
                        />
                      }
                    />
                    {/* <Divider /> */}
                  </MenuOptions>
                </Menu>
              </View>
            )}

            {/* greetings and punchline */}

            <View className="mx-4 space-y-2 mt-2 mb-4">
              <Text
                style={{ fontSize: hp(3.8) }}
                className="font-bold text-neutral-600"
              >
                Get inspired for your next{" "}
                <Text className="text-red-500">meal!</Text>
              </Text>
            </View>

            <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] mb-4">
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
        )}
        renderItem={null}
        ListFooterComponent={() => (
          <Recipes meals={state.meals} categories={categories} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
