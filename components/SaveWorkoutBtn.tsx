import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Text,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { cn } from "../lib/utils";

export type SaveWorkOutButtonProps = {
  onPress: () => void;
  className?: string;
  buttonText: string;
};

export default function SaveButton(props: SaveWorkOutButtonProps) {
  return (
    <View className={cn("mt-5 items-center", props.className)}>
      <TouchableOpacity
        className="bg-green-500 py-3 px-10 rounded-full shadow-lg"
        onPress={props.onPress}
      >
        <ThemedText className="text-white text-lg font-semibold">
          {props.buttonText}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}
