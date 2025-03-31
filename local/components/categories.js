import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

export function Categories({
  activeCategory,
  categories,
  handleChangeCategory,
}) {
  const renderItem = ({ item, index }) => {
    let isActive = item.strCategory === activeCategory;
    let activeButtonClass = isActive ? "bg-red-500" : "bg-black/10";

    return (
      <TouchableOpacity
        onPress={() => handleChangeCategory(item.strCategory)}
        key={item.strCategory} // Не нужен в FlatList, но если оставишь — не критично
        className="flex items-center space-y-1"
        style={{ marginRight: index !== categories.length - 1 ? 8 : 0 }}
      >
        <View className={"rounded-full p-[6px] " + activeButtonClass}>
          <Image
            className="rounded-full"
            style={{ height: hp(6), width: hp(6) }}
            source={item.strCategoryThumb}
          />
        </View>
        <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
          {item.strCategory}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View
    // entering={FadeInDown.duration(100).springify()}
    >
      <View>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item.strCategory}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        />
      </View>
    </Animated.View>
  );
}
