import { View } from "react-native";
import { SignedIn, useUser } from "@clerk/clerk-expo";

import "@/styles/globals.css";
import Greeting from "@/components/Greeting";
import { SignOutButton } from "@/components/SignOutButton";

export default function Home() {
  const { user } = useUser();

  return (
    <View className="flex-1 items-center justify-center p-5">
      <SignedIn>
        <Greeting name={`${user?.firstName} ${user?.lastName}`} />
        <SignOutButton />
      </SignedIn>

      
    </View>
  );
}
