import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemedView } from "../ThemedView";
import { useClerk } from "@clerk/clerk-expo";
import { ThemedText } from "../ThemedText";

export function SignoutButton() {
  const { signOut } = useClerk();
  const onPress = () => {
    signOut();
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedText>Sign out</ThemedText>
    </TouchableOpacity>
  );
}
