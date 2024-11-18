// File: app/log_workout.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

const LogWorkout = () => {
  // State to hold workouts
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    // Fetch workouts from your data source here
    // For demonstration, we'll use mock data
    const fetchWorkouts = async () => {
      const mockData = [
        {
          id: '1',
          name: 'Upper Body Strength',
          exercises: [
            { name: 'Bench Press', sets: 4, reps: 10 },
            { name: 'Pull Ups', sets: 3, reps: 8 },
            { name: 'Shoulder Press', sets: 4, reps: 12 },
          ],
        },
        {
          id: '2',
          name: 'Lower Body Power',
          exercises: [
            { name: 'Squats', sets: 5, reps: 5 },
            { name: 'Deadlifts', sets: 5, reps: 5 },
            { name: 'Lunges', sets: 3, reps: 12 },
          ],
        },
        // Add more workouts as needed
      ];
      setWorkouts(mockData);
    };

    fetchWorkouts();
  }, []);

  const renderWorkout = ({ item }) => (
    <View className="bg-gray-800 rounded-xl p-4 mb-4">
      <View className="flex-row items-center mb-3">
        <MaterialCommunityIcons name="dumbbell" size={24} color="#fff" />
        <Text className="text-white text-lg font-semibold ml-2">
          {item.name}
        </Text>
      </View>
      <View className="border-t border-gray-700 pt-3">
        {item.exercises.map((exercise, index) => (
          <View key={index} className="flex-row justify-between mb-2">
            <Text className="text-gray-300 text-base">{exercise.name}</Text>
            <Text className="text-gray-400 text-base">
              {exercise.sets} sets x {exercise.reps} reps
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} /> {/* Hide header */}
    <View className="flex-1 bg-gray-900 px-4 pt-4">
      <ThemedText className="text-2xl font-bold text-white mb-4">
        Your Workouts
      </ThemedText>
      <FlatList
        data={workouts}
        renderItem={renderWorkout}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
    </>
  );
};

export default LogWorkout;
