import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";

const API_KEY_WORKOUTS = process.env.EXPO_PUBLIC_API_KEY_WORKOUTS;

interface Exercise {
  id: string;
  name: string;
  image: string;
  type?: string;
  muscle?: string;
  equipment?: string;
  difficulty?: string;
  instructions?: string;
}

const Workouts: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<string>("biceps");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [workoutExercises, setWorkoutExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const muscleOptions = [
    "abdominals",
    "abductors",
    "adductors",
    "biceps",
    "calves",
    "chest",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "lower_back",
    "middle_back",
    "neck",
    "quadriceps",
    "traps",
    "triceps",
  ];

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        setError(null);
        setSelectedExercise(null);
        const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscle}`;
        const response = await fetch(apiUrl, {
          headers: {
            "X-Api-Key": API_KEY_WORKOUTS,
          },
        });

        if (response.ok) {
          const data: any[] = await response.json();
          const exercisesWithImages: Exercise[] = data.map(
            (exercise: any, index: number) => ({
              id: index.toString(),
              name: exercise.name,
              image: exercise.image || "https://example.com/default-image.png",
              type: exercise.type,
              muscle: exercise.muscle,
              equipment: exercise.equipment,
              difficulty: exercise.difficulty,
              instructions: exercise.instructions,
            })
          );
          setExercises(exercisesWithImages);
        } else {
          const errorData = await response.text();
          throw new Error(`Error ${response.status}: ${errorData}`);
        }
      } catch (err: any) {
        console.error("Error fetching exercises:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, [selectedMuscle]);

  const addExerciseToWorkout = () => {
    if (selectedExercise && !workoutExercises.some((ex) => ex.id === selectedExercise.id)) {
      setWorkoutExercises([...workoutExercises, selectedExercise]);
    }
  };

  const removeExerciseFromWorkout = (exerciseId: string) => {
    setWorkoutExercises(workoutExercises.filter((ex) => ex.id !== exerciseId));
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ThemedView className="p-5">
        <ThemedText
          type="title"
          className="text-center text-3xl my-3 text-gray-900 dark:text-white font-bold"
        >
          Create Your Workout
        </ThemedText>

        {/* Muscle Group Picker */}
        <View className="mt-5">
          <ThemedText className="text-base text-gray-800 dark:text-white mb-2">
            Select a Muscle Group:
          </ThemedText>
          <View className="border border-gray-300 dark:border-gray-700 rounded-md">
            <Picker
              selectedValue={selectedMuscle}
              onValueChange={(itemValue: string) => setSelectedMuscle(itemValue)}
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
                  const exercise = exercises.find((ex) => ex.id === itemValue) || null;
                  setSelectedExercise(exercise);
                }}
                style={{ height: 50, color: "#000" }}
                enabled={exercises.length > 0}
              >
                <Picker.Item label="-- Select Exercise --" value="" />
                {exercises.map((exercise) => (
                  <Picker.Item key={exercise.id} label={exercise.name} value={exercise.id} />
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
            <ThemedText className="text-white text-center">Add Exercise</ThemedText>
          </TouchableOpacity>
        </View>

        {/* List of Selected Exercises */}
        <View className="mt-5">
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
                    <ThemedText className="text-base text-gray-800 dark:text-white font-medium">
                      {item.name}
                    </ThemedText>
                  </View>
                  <TouchableOpacity onPress={() => removeExerciseFromWorkout(item.id)}>
                    <Ionicons name="trash-outline" size={24} color="#FF6F61" />
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>

        {/* Save Workout Button */}
        <View className="mt-5 items-center">
          <TouchableOpacity
            className="bg-green-500 py-3 px-10 rounded-full shadow-lg"
            onPress={() => {
              // Implement save functionality
            }}
          >
            <ThemedText className="text-white text-lg font-semibold">Save Workout</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </View>
  );
};

export default Workouts;
