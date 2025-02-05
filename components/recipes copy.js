import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
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
      <View className="border">
        <MasonryList
          data={mealData}
          keyExtractor={item => item.name}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, i }) => <RecipeItem item={item} index={i} />}
          // refreshing={isLoadingNext}
          // onRefresh={() => refetch({ first: ITEM_CNT })}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={<Text>No recipes available</Text>}
          // onEndReached={() => loadNext(ITEM_CNT)}
        />
      </View>
    </View>
  );
}
function RecipeItem({ item, index }) {
  return (
    <View className="p-2 bg-gray-200 rounded-lg">
      <Text className="text-lg font-semibold">{item.name}</Text>
    </View>
  );
}
