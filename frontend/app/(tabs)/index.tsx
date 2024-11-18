import React from 'react';
import { ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { router } from 'expo-router';

function Home() {
  
  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      {/* Header with Background Image */}
      <View className="relative h-56">
        <Image
          source={{ uri: 'https://example.com/header-image.jpg' }} // Replace with a suitable URL or local image
          className="absolute w-full h-full object-cover rounded-b-3xl opacity-90"
        />
        <View className="absolute bottom-5 left-5">
          <ThemedText className="text-2xl font-bold text-white shadow-lg">
            Good Morning, John!
          </ThemedText>
          <ThemedText className="text-lg text-white italic mt-1">
            "Your limitation—it's only your imagination."
          </ThemedText>
        </View>
      </View>

      <ThemedView className="p-5">
        {/* Today's Workout Section */}
        <View className="mt-6 p-5 bg-purple-100 dark:bg-purple-800 rounded-lg shadow-lg">
          <View className="flex-row items-center mb-2">
            <Ionicons name="barbell-outline" size={24} color="#673AB7" />
            <ThemedText className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
              Today's Workout
            </ThemedText>
          </View>
          <ThemedText className="text-base text-gray-700 dark:text-gray-300">
            HIIT Cardio Blast - 30 mins
          </ThemedText>
          <TouchableOpacity className="mt-4 bg-purple-500 py-3 rounded-full shadow-md">
            <ThemedText className="text-white text-center text-base font-semibold">
              Start Now
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Progress Overview Section */}
        <View className="mt-6">
          <View className="flex-row items-center mb-3">
            <MaterialIcons name="leaderboard" size={24} color="#FF9800" />
            <ThemedText className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
              This Week
            </ThemedText>
          </View>
          <View className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg flex items-center justify-center">
            {/* Integrate a progress chart here */}
            <ThemedText className="text-gray-600 dark:text-gray-300">
              Weekly Progress Chart
            </ThemedText>
          </View>
        </View>

        {/* Quick Actions Section */}
        <View className="mt-6 flex-row justify-between">
          <TouchableOpacity className="items-center flex-1 mx-1" onPress={() => router.push('/log_workout')}>
            <View className="bg-green-500 p-4 rounded-full shadow-lg">
              <Ionicons name="add-circle-outline" size={28} color="#fff" />
            </View>
            <ThemedText className="mt-2 text-gray-800 dark:text-white font-medium">
              Log Workout
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1 mx-1" onPress={() => router.push('/track_meals')}>
            <View className="bg-yellow-500 p-4 rounded-full shadow-lg">
              <Ionicons name="restaurant-outline" size={28} color="#fff" />
            </View>
            <ThemedText className="mt-2 text-gray-800 dark:text-white font-medium">
              Track Meals
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center flex-1 mx-1" onPress={() => router.push('/health_stats')}>
            <View className="bg-pink-500 p-4 rounded-full shadow-lg">
              <Ionicons name="heart-outline" size={28} color="#fff" />
            </View>
            <ThemedText className="mt-2 text-gray-800 dark:text-white font-medium">
              Health Stats
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Featured Content Section */}
        <View className="mt-6">
          <View className="flex-row items-center mb-3">
            <MaterialIcons name="stars" size={24} color="#2196F3" />
            <ThemedText className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
              Recommended for You
            </ThemedText>
          </View>
          <View className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg flex items-center justify-center">
            <ThemedText className="text-gray-600 dark:text-gray-300">
              Featured Workout or Content
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

export default Home;
