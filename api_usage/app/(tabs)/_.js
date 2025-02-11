import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
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
import { Categories, Recipes } from "@/components";

export default function HomeScreen() {
  const [state, setState] = useState({
    activeCategory: "Beef",
    meals: [],
  });

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response.data?.categories) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log("Error in getCategories:", error);
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
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const meals = response.data?.meals || [];

        setState(prev => ({
          ...prev,
          activeCategory: category,
          meals,
        }));
      } catch (error) {
        console.log("Error in getMeals:", error);
      }
    }
  };

  useEffect(() => {
    getCategories();
    getMeals(state.activeCategory);
  }, []);

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <StatusBar style="dark" />
      <FlatList
        data={[]}
        keyExtractor={() => "dummy"}
        ListHeaderComponent={() => (
          <>
            {/* <View className="mx-4 flex-row justify-between items-center mb-4">
              <Image
                style={{ height: hp(5), width: hp(5) }}
                source={require("../../assets/images/avatar.png")}
              />
              <FontAwesome name="bell-o" size={hp(4)} color="gray" />
            </View> */}

            <View className="mx-4 space-y-2 mt-2 mb-4">
              {/* <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
                Hello, Serg
              </Text> */}
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
                style={{ fontSize: hp(1.7) }}
                className="flex-1 text-base mb-1 pl-3 tracking-wider"
              />
              <TouchableOpacity className="bg-white rounded-full p-3">
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
