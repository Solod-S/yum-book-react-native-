import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Loading } from "../../components";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";

export default function RecipeScreen() {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [favorite, setFavorite] = useState(false);
  const [mealData, setMealData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async id => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      console.log(`response`, response.data.meals[0]);
      if (response.data?.meals[0]) {
        setMealData(response.data.meals[0]);
      }
    } catch (error) {
      console.log("Error in getRecipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-white flex-1">
      <StatusBar style="light" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View className="flex-row justify-center">
          <Image
            source={{ uri: item.strMealThumb }}
            contentFit="cover"
            style={{
              width: wp(98),
              height: hp(50),
              borderRadius: 43,
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
          />
        </View>
        <View className="w-full absolute flex-row justify-between items-center pt-14">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 rounded-full ml-5"
          >
            <FontAwesome
              name="chevron-circle-left"
              size={hp(5.5)}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setFavorite(prevState => {
                return !prevState;
              })
            }
            style={{ backgroundColor: "white" }}
            className="p-2 rounded-full mr-5 "
          >
            <FontAwesome
              name="heart"
              size={hp(3)}
              color={favorite ? "red" : "gray"}
            />
          </TouchableOpacity>
        </View>

        {/* meal description */}
        {isLoading ? (
          <Loading size="large" className="mt-16" />
        ) : (
          <View className="px-4 flex justify-between space-y-4 pt-8">
            {/* name and area */}
            <View className="space-y-2">
              <Text
                style={{ fontSize: hp(3) }}
                className="font-bold text-neutral-700"
              >
                {mealData.strMeal}
              </Text>
              <Text
                style={{ fontSize: hp(3) }}
                className="font-medium text-neutral-500"
              >
                {mealData.strArea}
              </Text>
            </View>

            {/* misc */}
            <View className="flex-row justify-around">
              <View className="flex rounded-full bg-red-400 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <FontAwesome name="clock-o" size={hp(4)} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    35
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Mins
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-red-400 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <FontAwesome name="signal" size={hp(4)} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    03
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Rating
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-red-400 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <FontAwesome name="heart" size={hp(4)} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    03
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Likes
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-red-400 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <FontAwesome name="flask" size={hp(4)} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    03
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Ingr
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

//
