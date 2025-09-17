import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { queryClient } from "@/libs/configs/query-client";

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
