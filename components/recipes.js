import { View, Text, FlatList, Pressable, Image } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { mealData } from "@/constants";

export function Recipes() {
  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      <FlatList
        data={mealData}
        keyExtractor={item => item.name}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => (
          <RecipeItem item={item} index={index} />
        )}
        ListEmptyComponent={<Text>No recipes available</Text>}
      />
    </View>
  );
}

function RecipeItem({ item, index }) {
  return (
    <Animated.View
      className="flex-1"
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()}
    >
      <Pressable
        style={{
          marginBottom: hp(2.5),
          width: wp(44),
          height: wp(52),
          borderRadius: 25,
        }}
        className="flex py-3 "
      >
        <Image
          source={{ uri: item.image }}
          contentFit="cover"
          style={{ width: wp(44), height: wp(52), borderRadius: 25 }}
        />
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.name.length > 15 ? item.name.slice(0, 15) + "..." : item.name}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
