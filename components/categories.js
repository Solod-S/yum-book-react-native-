import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoryData } from "@/constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

export function Categories({
  activeCategory,
  categories,
  handleChangeCategory,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="space-x-4"
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {categories.length > 0 &&
            categories.map((categoryData, index) => {
              let isActive = categoryData.strCategory === activeCategory;
              let activeButtonClass = isActive ? "bg-red-500" : "bg-black/10";

              return (
                <TouchableOpacity
                  onPress={() => handleChangeCategory(categoryData.strCategory)}
                  key={categoryData.strCategory}
                  className="flex items-center space-y-1"
                  style={{
                    marginRight: index !== categoryData.length - 1 ? 8 : 0,
                  }}
                >
                  <View
                    className={"rounded-full p-[6px] " + activeButtonClass}
                    // className="rounded-full p-[6px]"
                  >
                    <Image
                      className="rounded-full"
                      style={{ height: hp(6), width: hp(6) }}
                      source={{ uri: categoryData.strCategoryThumb }}
                    />
                  </View>
                  <Text
                    className="text-neutral-600"
                    style={{ fontSize: hp(1.6) }}
                  >
                    {categoryData.strCategory}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </Animated.View>
  );
}
