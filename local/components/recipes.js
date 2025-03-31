import React, { useCallback } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Header } from "./header";

export function Recipes({
  categories,
  meals,
  searchQueryRef,
  handleSearch,
  handleChangeCategory,
  state,
}) {
  const router = useRouter();

  return (
    <View className="mx-4">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>

      <FlatList
        ListHeaderComponent={() => (
          <Header
            searchQueryRef={searchQueryRef}
            categories={categories}
            handleSearch={handleSearch}
            handleChangeCategory={handleChangeCategory}
            state={state}
          />
        )}
        data={meals}
        keyExtractor={item => item.idMeal.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => (
          <RecipeItem item={item} index={index} router={router} />
        )}
        ListEmptyComponent={
          <Animated.View
            className="flex-1 justify-center items-center"
            entering={FadeInDown.delay(100).duration(600).springify()}
          >
            <Text
              className=" mt-12 font-semibold text-red-100"
              style={{ fontSize: hp(3.5), textAlign: "center" }}
            >
              no meals
            </Text>
          </Animated.View>
        }
      />
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
            source={item.strMealThumb}
            contentFit="cover"
            style={{
              width: wp(40),
              height: wp(40),
              borderRadius: 20,
            }}
          />
        </View>

        <Text
          style={{ fontSize: hp(1.5), textAlign: "center" }}
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
