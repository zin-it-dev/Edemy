import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import "@/styles/globals.css";
import Greeting from "@/components/Greeting";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center p-5">
      <Greeting name="ZIN" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
