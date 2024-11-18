import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  SignInButton,
  UserButton,
} from "@clerk/clerk-expo/dist/web/uiComponents";
import SaveButton from "../../../components/SaveWorkoutBtn";
import { SignoutButton } from "../../../components/clerk/SIgnoutButton";
import { SignedIn } from "@clerk/clerk-expo";
import { TextInput } from "react-native-gesture-handler";
import useAuthAdapter from "../../../hooks/useAuth";
import { useFetchExercises } from "./useFetchExercises";
import { Stack } from "expo-router";

const API_KEY_WORKOUTS = process.env.EXPO_PUBLIC_API_KEY_WORKOUTS;
const api = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";
const DEFAULT_WORKOUT_DETAILS = {
  name: "",
  description: "",
  imageUrl: "https://example.com/default-image.png",
};

type ExerciseExternalAPI = {
  id?: string;
  name: string;
  imageUrl: string;
  description: string;
};

type ExerciseWithFrequency = {
  reps: number;
  sets: number;
  weight: number;
  units: string;
};

type Exercise2 = ExerciseExternalAPI & ExerciseWithFrequency;
type WorkoutDetails = {
  name: string;
  imageUrl: string;
  description: string;
};
type Workout = WorkoutDetails & {
  userId: string;
  exercises: Exercise2[];
};

const Workouts: React.FC = () => {
  // Clerk
  const { isLoaded, userId } = useAuthAdapter();
  const {
    exercises,
    setExercises,
    selectedMuscle,
    setSelectedMuscle,
    selectedExercise,
    setSelectedExercise,
    workoutExercises,
    setWorkoutExercises,
    loading,
    setLoading,
    error,
    setError,
    muscleOptions,
  } = useFetchExercises({ api_key: API_KEY_WORKOUTS as string });
  const [workoutAdded, setWorkoutAdded] = useState<Boolean>(false);
  const [workoutDetails, setWorkoutDetails] = useState<WorkoutDetails>(
    DEFAULT_WORKOUT_DETAILS
  );
  const addExerciseToWorkout = () => {
    if (
      selectedExercise &&
      !workoutExercises.some((ex) => ex.id === selectedExercise.id)
    ) {
      setWorkoutExercises([...workoutExercises, selectedExercise]);
    }
  };

  const removeExerciseFromWorkout = (exerciseId: string) => {
    setWorkoutExercises(workoutExercises.filter((ex) => ex.id !== exerciseId));
  };

  const handleWorkoutDetailsChange = (fieldName: string, value: string) => {
    setWorkoutDetails((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const saveWorkout = async () => {
    if (workoutExercises.length === 0) {
      alert("Please add at least one exercise to your workout.");
      return;
    }

    if (!userId) return;

    const profileId = "user-profile-id"; // fetch user id later on

    const workoutData: Workout = {
      userId: userId as string,
      name: workoutDetails.name,
      description: workoutDetails.description,
      imageUrl: workoutDetails.imageUrl,
      exercises: workoutExercises.map((exercise) => {
        const ex: Exercise2 = {
          name: exercise.name,
          imageUrl: exercise.image,
          description: exercise.instructions as string,
          reps: 10, // Hard coded for sprint 2
          sets: 10, // Hard coded for sprint 2
          units: "lbs", // Hard coded for sprint 2
          weight: 5, // Hard coded for sprint 2
        };

        return ex;
      }),
    };

    try {
      const response = await fetch(`${api}/workout/workout-template`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutData),
      });
      const data = await response.json();
      if (data) {
        // console.log(data);
        setWorkoutExercises([]);
        alert("Workout added");
        setWorkoutDetails(DEFAULT_WORKOUT_DETAILS);
      }
    } catch (error: any) {
      console.error("Error saving workout:", error);
      setError(error.message);
    }
  };

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} /> {/* Hide header */}
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <ThemedView className="p-5">
       
      <ThemedText
  type="title"
  className="text-center text-4xl my-5 text-white font-bold"
>
  Create Your Workout
</ThemedText>

{/* Workout Details */}
<View className="gap-4 mt-5">
  <Text className="text-xl text-white font-semibold">Workout Details</Text>
  <TextInput
    placeholder="Workout Name"
    value={workoutDetails.name}
    className="p-4 rounded-lg bg-gray-800 text-white"
    placeholderTextColor="#aaa"
    onChangeText={(value) => handleWorkoutDetailsChange("name", value)}
  />
  <TextInput
    placeholder="Description"
    value={workoutDetails.description}
    className="p-4 rounded-lg bg-gray-800 text-white"
    placeholderTextColor="#aaa"
    onChangeText={(value) =>
      handleWorkoutDetailsChange("description", value)
    }
  />
</View>

        {/* Muscle Group Picker */}
        <View className="mt-5">
          <ThemedText className="text-base text-gray-800 dark:text-white mb-2">
            Select a Muscle Group:
          </ThemedText>
          <View className="border border-gray-300 dark:border-gray-700 rounded-md">
            <Picker
              selectedValue={selectedMuscle}
              onValueChange={(itemValue: string) =>
                setSelectedMuscle(itemValue)
              }
              style={{ height: 50, color: "#000" }}
            >
              {muscleOptions.map((muscle) => (
                <Picker.Item key={muscle} label={muscle} value={muscle} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Exercise Picker */}
        <View className="mt-5">
          <ThemedText className="text-base text-gray-800 dark:text-white mb-2">
            Select an Exercise:
          </ThemedText>

          <View className="border border-gray-300 dark:border-gray-700 rounded-md">
            {loading ? (
              <View className="justify-center items-center h-12">
                <ActivityIndicator size="small" color="#0000ff" />
              </View>
            ) : error ? (
              <View className="p-2">
                <ThemedText className="text-red-500">{error}</ThemedText>
              </View>
            ) : exercises.length > 0 ? (
              <Picker
                selectedValue={selectedExercise?.id || ""}
                onValueChange={(itemValue: string) => {
                  const exercise =
                    exercises.find((ex) => ex.id === itemValue) || null;
                  setSelectedExercise(exercise);
                }}
                style={{ height: 50, color: "#000" }}
                enabled={exercises.length > 0}
              >
                <Picker.Item label="-- Select Exercise --" value="" />
                {exercises.map((exercise) => (
                  <Picker.Item
                    key={exercise.id}
                    label={exercise.name}
                    value={exercise.id}
                  />
                ))}
              </Picker>
            ) : (
              <View className="p-2">
                <ThemedText className="text-gray-600 dark:text-gray-400">
                  No exercises found for this muscle group.
                </ThemedText>
              </View>
            )}
          </View>
          <TouchableOpacity
            className={`mt-3 py-2 px-4 rounded-full ${
              selectedExercise ? "bg-blue-500" : "bg-gray-400"
            }`}
            onPress={addExerciseToWorkout}
            disabled={!selectedExercise}
          >
            <ThemedText className="text-white text-center">
              Add Exercise
            </ThemedText>
          </TouchableOpacity>
        </View>

        <SaveButton buttonText="Save Workout" onPress={saveWorkout} />
        {/* List of Selected Exercises */}
        <ScrollView className="mt-5">
          <ThemedText
            type="subtitle"
            className="text-xl mb-3 text-gray-900 dark:text-white font-semibold"
          >
            Your Workout Exercises:
          </ThemedText>
          {workoutExercises.length === 0 ? (
            <ThemedText className="text-gray-600 dark:text-gray-400">
              No exercises added yet.
            </ThemedText>
          ) : (
            <FlatList
              data={workoutExercises}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View className="flex-row items-center mb-3 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow">
                  <Image
                    source={{ uri: item.image }}
                    className="w-16 h-16 rounded-md mr-3"
                  />
                  <View className="flex-1">
                    <Text className="font-bold text-2xl text-gray-800 dark:text-white ">
                      {item.name}
                    </Text>
                    <ThemedText className="text-base text-gray-800 dark:text-white font-medium">
                      {item.instructions}
                    </ThemedText>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeExerciseFromWorkout(item.id)}
                  >
                    <Ionicons name="trash-outline" size={24} color="#FF6F61" />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </ScrollView>
      </ThemedView>
    </ScrollView>
    </>
  );
};

export default Workouts;