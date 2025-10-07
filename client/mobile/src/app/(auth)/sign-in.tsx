import { ActivityIndicator, Text, View } from "react-native";
import { Link, Redirect } from "expo-router";

import OAuthButton from "@/components/OAuthButton";
import { useAuth } from "@clerk/clerk-expo";
import { useState } from "react";

function SignIn() {
  const { isLoaded, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  if (isLoaded && isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 items-center justify-center">
      {loading && (
        <View className="absolute inset-0 items-center justify-center bg-black/50 z-50">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-2">Loading...</Text>
        </View>
      )}

      {!isLoaded ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <>
          <View style={{ marginBottom: 24 }}>
            <OAuthButton
              strategy="oauth_google"
              onLoading={(val) => setLoading(val)}
            >
              Sign in with Google
            </OAuthButton>
          </View>

          <View style={{ marginBottom: 24 }}>
            <OAuthButton
              strategy="oauth_facebook"
              onLoading={(val) => setLoading(val)}
            >
              Sign in with Facebook
            </OAuthButton>
          </View>

          <Link href="/sign-up">
            <Text>Sign Up</Text>
          </Link>
        </>
      )}
    </View>
  );
}

export default SignIn;
