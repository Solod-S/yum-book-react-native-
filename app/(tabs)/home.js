import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Categories, Recipes } from "@/components";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

    getCategories();
  }, []);

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <StatusBar style="dark" />
      <FlatList
        data={[]}
        keyExtractor={() => "dummy"} // Пустой массив, просто чтобы не было ошибки
        ListHeaderComponent={() => (
          <>
            {/* Avatar and Bell */}
            <View className="mx-4 flex-row justify-between items-center mb-4">
              <Image
                style={{ height: hp(5), width: hp(5) }}
                source={require("../../assets/images/avatar.png")}
              />
              <FontAwesome name="bell-o" size={hp(4)} color="gray" />
            </View>

            {/* Greeting */}
            <View className="mx-4 space-y-2 mb-4">
              <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
                Hello, Serg
              </Text>
              <Text
                style={{ fontSize: hp(3.8) }}
                className="font-semibold text-neutral-600"
              >
                Make your food, stay at{" "}
                <Text className="text-red-500">home</Text>
              </Text>
            </View>

            {/* Search Bar */}
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

            {/* Categories */}
            <View className="mb-4">
              {categories.length > 0 && (
                <Categories
                  categories={categories}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              )}
            </View>
          </>
        )}
        renderItem={null} // Оставляем пустым, так как Recipes будет рендерить свой список
        ListFooterComponent={() => <Recipes />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
