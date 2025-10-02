import { Text } from "react-native";
import React from "react";

const Greeting = ({ name }: { name: string }) => {
  return <Text className="text-xl fw-bold">Welcome to {name}</Text>;
};

export default Greeting;
