import { View } from "react-native";
import React from "react";

import Greeting from "@/components/Greeting";

const Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Greeting />
    </View>
  );
};

export default Home;
