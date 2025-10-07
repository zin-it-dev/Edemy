import { TokenCache } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        return await SecureStore.getItemAsync(key);
      } catch (error) {
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    saveToken: async (key: string, value: string) => {
      try {
        await SecureStore.setItemAsync(key, value);
      } catch (error) {
        return;
      }
    },
  };
};

export const tokenCache =
  Platform.OS !== "web" ? createTokenCache() : undefined;
