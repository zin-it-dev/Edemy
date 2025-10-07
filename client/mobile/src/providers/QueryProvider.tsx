import React from "react";
import { onlineManager, QueryClientProvider } from "@tanstack/react-query";
import NetInfo from '@react-native-community/netinfo';

import { queryClient } from "@/libs/apis/queryClient";

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
