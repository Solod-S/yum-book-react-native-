import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export function Loading(props) {
  return (
    <View className="flex-1 flex justify-center items-center">
      <ActivityIndicator {...props} />
    </View>
  );
}
