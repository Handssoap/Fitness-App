import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { API_KEY_WORKOUTS } from '@env';

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
  const [exercises, setExercises] = useState<Exercise[]>([]); // List of exercises from API
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [workoutExercises, setWorkoutExercises] = useState<Exercise[]>([]); // User's selected exercises
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    // Fetch exercises from API
    const fetchExercises = async () => {
      try {
        const muscle = 'biceps'; // You can make this dynamic
        const apiUrl = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;
        const response = await fetch(apiUrl, {
          headers: {
            'X-Api-Key': API_KEY_WORKOUTS,
          },
        });

        if (response.ok) {
          const data: any[] = await response.json();

          // Map data to include an 'id' and 'image' property
          const exercisesWithImages: Exercise[] = data.map((exercise: any, index: number) => ({
            id: index.toString(),
            name: exercise.name,
            image: exercise.image || 'https://example.com/default-image.png',
            type: exercise.type,
            muscle: exercise.muscle,
            equipment: exercise.equipment,
            difficulty: exercise.difficulty,
            instructions: exercise.instructions,
          }));
          setExercises(exercisesWithImages);
          setLoading(false);
        } else {
          const errorData = await response.text();
          throw new Error(`Error ${response.status}: ${errorData}`);
        }
      } catch (err: any) {
        console.error('Error fetching exercises:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const addExerciseToWorkout = () => {
    if (selectedExercise) {
      // Check if exercise is already in the workout
      if (!workoutExercises.some((ex) => ex.id === selectedExercise.id)) {
        setWorkoutExercises([...workoutExercises, selectedExercise]);
      }
    }
  };

  const removeExerciseFromWorkout = (exerciseId: string) => {
    setWorkoutExercises(workoutExercises.filter((ex) => ex.id !== exerciseId));
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-gray-900">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-5 bg-white dark:bg-gray-900">
        <ThemedText className="text-red-500 text-center">{error}</ThemedText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ThemedView className="p-5">
        <ThemedText
          type="title"
          className="text-center text-3xl my-3 text-gray-900 dark:text-white"
        >
          Create Your Workout
        </ThemedText>

        {/* Dropdown Picker */}
        <View className="mt-5">
          <ThemedText className="text-base text-gray-800 dark:text-white mb-2">
            Select an Exercise:
          </ThemedText>
          <View className="border border-gray-300 dark:border-gray-700 rounded-md">
            <Picker
              selectedValue={selectedExercise?.id || ''}
              onValueChange={(itemValue: string) => {
                const exercise = exercises.find((ex) => ex.id === itemValue) || null;
                setSelectedExercise(exercise);
              }}
              style={{ height: 50, color: '#000' }}
            >
              <Picker.Item label="-- Select Exercise --" value="" />
              {exercises.map((exercise) => (
                <Picker.Item key={exercise.id} label={exercise.name} value={exercise.id} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            className={`mt-3 py-2 px-4 rounded-full ${
              selectedExercise ? 'bg-blue-500' : 'bg-gray-400'
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
            className="text-xl mb-3 text-gray-900 dark:text-white"
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
                <View className="flex-row items-center mb-3">
                  <Image
                    source={{ uri: item.image }}
                    className="w-16 h-16 rounded-md mr-3"
                  />
                  <View className="flex-1">
                    <ThemedText className="text-base text-gray-800 dark:text-white">
                      {item.name}
                    </ThemedText>
                    {/* You can display additional info here */}
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
            <ThemedText className="text-white text-lg font-semibold">
              Save Workout
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </View>
  );
};

export default Workouts;
