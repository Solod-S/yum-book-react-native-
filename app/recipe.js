import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Loading } from "../components";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import YoutubeIframe from "react-native-youtube-iframe";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipeScreen() {
  const router = useRouter();
  const item = useLocalSearchParams();
  const [favorite, setFavorite] = useState(false);
  const [mealData, setMealData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getYoutubeVideoId = url => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  const getMealData = async id => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      // console.log(`response`, response.data.meals[0]);
      if (response.data?.meals[0]) {
        setMealData(response.data.meals[0]);
      }
    } catch (error) {
      console.log("Error in getRecipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ingredientsIndexes = meal => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 0; i < 25; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <View className="bg-white flex-1 pt-1">
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
                borderRadius: 12,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
              }}
            />
          </View>
          {/* back btn */}
          <Animated.View
            entering={FadeIn.delay(200).duration(1000)}
            className="w-full absolute flex-row justify-between items-center pt-3"
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
            <TouchableOpacity
              onPress={() =>
                setFavorite(prevState => {
                  return !prevState;
                })
              }
              style={{ backgroundColor: "#EF4444" }}
              className="p-2 rounded-full mr-5 "
            >
              <FontAwesome
                name="heart"
                size={hp(3)}
                color={favorite ? "black" : "white"}
              />
            </TouchableOpacity>
          </Animated.View>

          {/* meal description */}
          {isLoading ? (
            <Loading size="large" className="mt-16" />
          ) : (
            <View className="px-4 flex justify-between gap-2 pt-8">
              {/* name and area */}
              <Animated.View
                entering={FadeInDown.duration(700).springify().damping(12)}
                className="gap-1 "
              >
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
              </Animated.View>

              {/* misc */}
              <Animated.View
                entering={FadeInDown.delay(100)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="flex-row justify-around"
              >
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
                  <View className="flex items-center py-2 gap-1">
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
              </Animated.View>

              {/* ingredients */}
              <Animated.View
                entering={FadeInDown.delay(200)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="gap-4"
              >
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="font-bold flex-1 text-1 text-neutral-700"
                >
                  Ingredients
                </Text>
                <View className="gap-2 ml-3">
                  {ingredientsIndexes(mealData).map(i => {
                    return (
                      <View key={i} className="flex-row space-x-4">
                        <View
                          style={{ height: hp(1.5), width: hp(1.5) }}
                          className="bg-red-400 rounded-full"
                        />
                        <View className="flex-row gap-1">
                          <Text style={{ fontSize: hp(1.7) }} className="ml-2">
                            {mealData["strMeasure" + i]}
                          </Text>
                          <Text style={{ fontSize: hp(1.7) }}>
                            {mealData["strIngredient" + i]}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </Animated.View>

              {/* instructions */}
              <View className="gap-4">
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="font-bold flex-1 text-1 text-neutral-700"
                >
                  Instructions
                </Text>
                <Text
                  style={{ fontSize: hp(1.6) }}
                  className="text-neutral-700"
                >
                  {mealData?.strInstructions}
                </Text>
              </View>

              {/* video */}
              {mealData.strYoutube && (
                <View className="space-y-4">
                  <Text
                    style={{ fontSize: hp(2.5) }}
                    className="font-bold flex-1 text-neutral-700 mb-1"
                  >
                    Recipe Video
                  </Text>
                  <View>
                    <YoutubeIframe
                      videoId={getYoutubeVideoId(mealData.strYoutube)}
                      height={hp(30)}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

//
