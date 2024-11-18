import { useAuth } from "@clerk/clerk-expo";
import { Text } from "react-native";

export default function useAuthAdapter() {
  const { isLoaded, userId, sessionId } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return { isLoaded: false, userId: null };
  }

  return { isLoaded, userId };
}
