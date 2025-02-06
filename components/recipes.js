import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { Image } from "expo-image";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Loading } from "./loading";
import { useRouter } from "expo-router";

export function Recipes({ categories, meals }) {
  const router = useRouter();

  return (
    <View className="mx-4">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      {categories.length <= 0 || meals.length <= 0 ? (
        <Loading size="large" className="mt-20" />
      ) : (
        <FlatList
          data={meals}
          keyExtractor={item => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item, index }) => (
            <RecipeItem item={item} index={index} router={router} />
          )}
          ListEmptyComponent={<Text>No recipes available</Text>}
        />
      )}
    </View>
  );
}

function RecipeItem({ item, index, router }) {
  return (
    <Animated.View
      className="flex-1 "
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()}
    >
      <Pressable
        onPress={() => router.push({ pathname: "/recipe", params: item })}
        style={{
          marginBottom: hp(2.5),
          width: wp(44),
          height: wp(52),
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
        }}
        className="flex py-3"
      >
        {/* Обернули картинку в View и центрируем */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={{ uri: item.strMealThumb }}
            contentFit="cover"
            style={{
              width: wp(40),
              height: wp(40),
              borderRadius: 20,
            }}
          />
        </View>

        <Text
          style={{ fontSize: hp(1.5), textAlign: "center" }} // Выровняли текст по центру
          className="font-semibold text-neutral-600 mt-2"
        >
          {item.strMeal.length > 26
            ? item.strMeal.slice(0, 26) + "..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
