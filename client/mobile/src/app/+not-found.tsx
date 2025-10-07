import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! Not Found" }} />
      <View className="flex-1 items-center justify-center">
        <Text>This screen does not exist.</Text>
        <Link href="/" className="p-5 bg-red-500">
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}
