import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const CourseDetail = () => {
  const { id } = useLocalSearchParams();

  return (
    <View className="p-5">
      <Text className="text-xl">Course detail {id}</Text>
    </View>
  );
};

export default CourseDetail;
