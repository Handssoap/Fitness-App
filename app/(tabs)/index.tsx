import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

function Home() {
  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      <ThemedView className="p-5">
        {/* Greeting */}
        <ThemedText className="text-xl font-semibold text-gray-900 dark:text-white">
          Good Morning, John!
        </ThemedText>
        <ThemedText className="text-base text-gray-600 dark:text-gray-300 mt-1">
          "Your limitation—it's only your imagination."
        </ThemedText>

        {/* Today's Workout */}
        <View className="mt-6 p-5 bg-purple-100 dark:bg-purple-800 rounded-lg">
          <ThemedText className="text-lg font-bold text-gray-900 dark:text-white">
            Today's Workout
          </ThemedText>
          <ThemedText className="text-base text-gray-700 dark:text-gray-300 mt-2">
            HIIT Cardio Blast - 30 mins
          </ThemedText>
          <TouchableOpacity className="mt-4 bg-purple-500 py-2 px-4 rounded-full">
            <ThemedText className="text-white text-center">Start Now</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Progress Overview */}
        <View className="mt-6">
          <ThemedText className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            This Week
          </ThemedText>
          {/* Insert progress chart or summary here */}
          <View className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </View>

        {/* Quick Actions */}
        <View className="mt-6 flex-row justify-around">
          <TouchableOpacity className="items-center">
            <View className="bg-blue-500 p-4 rounded-full">
              <Ionicons name="add-circle-outline" size={24} color="#fff" />
            </View>
            <ThemedText className="mt-2 text-gray-800 dark:text-white">
              Log Workout
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <View className="bg-green-500 p-4 rounded-full">
              <Ionicons name="nutrition-outline" size={24} color="#fff" />
            </View>
            <ThemedText className="mt-2 text-gray-800 dark:text-white">
              Track Meals
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <View className="bg-red-500 p-4 rounded-full">
              <Ionicons name="heart-outline" size={24} color="#fff" />
            </View>
            <ThemedText className="mt-2 text-gray-800 dark:text-white">
              Health Stats
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Featured Content */}
        <View className="mt-6">
          <ThemedText className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Recommended for You
          </ThemedText>
          {/* Insert featured workout or content here */}
          <View className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </View>
      </ThemedView>
    </ScrollView>
  );
}

export default Home;
