import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import Greeting from "@/components/Greeting";
import useCategory from "@/hooks/use-category";

export default function Home() {
  const { data, isLoading, isError, error } = useCategory();

  if (isLoading) {
    return <Text>Loading categories...</Text>;
  }

  if (isError) {
    return <Text>Error: {error?.message}</Text>;
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Greeting />

      {data?.map((category) => (
        <Text className="text-base text-red-300" key={category.slug}>
          {category.name}
        </Text>
      ))}
      <StatusBar style="auto" />
    </View>
  );
}
