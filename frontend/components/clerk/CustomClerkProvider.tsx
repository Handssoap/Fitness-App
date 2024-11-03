import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type CustomClerkProviderProps = {
  publishableKey?: string;
  children: React.ReactNode;
};

function CustomClerkProvider(props: CustomClerkProviderProps) {
  return (
    <ClerkProvider
      publishableKey={
        props.publishableKey || process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
      }
    >
      <ClerkLoaded>{props.children}</ClerkLoaded>
    </ClerkProvider>
  );
}

export default CustomClerkProvider;
