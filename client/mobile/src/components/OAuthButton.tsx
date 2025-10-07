import { useAuth, useSSO } from "@clerk/clerk-expo";
import { OAuthStrategy } from "@clerk/types";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";

import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

interface Props {
  strategy: OAuthStrategy;
  children: React.ReactNode;
  onLoading?: (loading: boolean) => void;
}

export default function OAuthButton({ strategy, children, onLoading }: Props) {
  useWarmUpBrowser();
  const { startSSOFlow } = useSSO();
  const { isLoaded, signOut } = useAuth();
  const router = useRouter();

  const onPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }
    onLoading?.(true);

    try {
      await signOut();

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace("/");
      } else {
        throw new Error("Failed to create session");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      onLoading?.(false);
    }
  }, [startSSOFlow, strategy, isLoaded]);

  return (
    <TouchableOpacity onPress={onPress} className="bg-blue-400 p-5">
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
