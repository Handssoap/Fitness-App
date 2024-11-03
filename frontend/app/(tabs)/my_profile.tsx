import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

function MyProfile() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FF6F61', dark: '#FF6F61' }}
      headerImage={
        <View className="justify-center items-center pt-12 bg-gradient-to-b from-pink-500 to-red-500">
          {/* Replace with user's profile picture if available */}
          <Ionicons name="person-circle-outline" size={120} color="#fff" />
        </View>
      }
    >
      <ThemedView className="p-5 bg-white dark:bg-gray-900">
        <ThemedText type="title" className="text-center text-3xl my-3 text-gray-900 dark:text-white">
          John Doe
        </ThemedText>
        <ThemedText className="text-center text-base text-gray-600 dark:text-gray-300 mb-6">
          john.doe@example.com
        </ThemedText>

        <View className="flex-row justify-around mb-8">
          <View className="items-center">
            <View className="bg-blue-500 p-3 rounded-full shadow-md">
              <Ionicons name="barbell-outline" size={24} color="#fff" />
            </View>
            <ThemedText className="mt-2 text-base text-gray-800 dark:text-white">
              Workouts
            </ThemedText>
            <ThemedText className="text-lg font-bold text-gray-800 dark:text-white">
              45
            </ThemedText>
          </View>
          <View className="items-center">
            <View className="bg-green-500 p-3 rounded-full shadow-md">
              <Ionicons name="time-outline" size={24} color="#fff" />
            </View>
            <ThemedText className="mt-2 text-base text-gray-800 dark:text-white">
              Total Hours
            </ThemedText>
            <ThemedText className="text-lg font-bold text-gray-800 dark:text-white">
              120
            </ThemedText>
          </View>
          <View className="items-center">
            <View className="bg-purple-500 p-3 rounded-full shadow-md">
              <Ionicons name="flame-outline" size={24} color="#fff" />
            </View>
            <ThemedText className="mt-2 text-base text-gray-800 dark:text-white">
              Calories
            </ThemedText>
            <ThemedText className="text-lg font-bold text-gray-800 dark:text-white">
              5,000
            </ThemedText>
          </View>
        </View>

        <ThemedView className="mb-8">
          <ThemedText type="subtitle" className="text-xl mb-5 text-gray-900 dark:text-white">
            Personal Information
          </ThemedText>
          <View className="flex-row items-center mb-3">
            <Ionicons name="person-outline" size={20} color="#FF6F61" />
            <ThemedText className="ml-3 text-base text-gray-800 dark:text-gray-300">
              Age: 28
            </ThemedText>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="resize-outline" size={20} color="#FF6F61" />
            <ThemedText className="ml-3 text-base text-gray-800 dark:text-gray-300">
              Height: 175 cm
            </ThemedText>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="speedometer-outline" size={20} color="#FF6F61" />
            <ThemedText className="ml-3 text-base text-gray-800 dark:text-gray-300">
              Weight: 70 kg
            </ThemedText>
          </View>
        </ThemedView>

        <ThemedView className="mb-8">
          <ThemedText type="subtitle" className="text-xl mb-5 text-gray-900 dark:text-white">
            Achievements
          </ThemedText>
          <View className="flex-row items-center mb-4">
            <Ionicons name="trophy-outline" size={24} color="#FFD700" />
            <ThemedText className="ml-3 text-base text-gray-800 dark:text-gray-300">
              Marathon Finisher
            </ThemedText>
          </View>
          <View className="flex-row items-center mb-4">
            <Ionicons name="medal-outline" size={24} color="#C0C0C0" />
            <ThemedText className="ml-3 text-base text-gray-800 dark:text-gray-300">
              100 Days Workout Streak
            </ThemedText>
          </View>
        </ThemedView>

        {/* Example of an action button */}
        <View className="items-center">
          <TouchableOpacity className="bg-gradient-to-r from-green-400 to-blue-500 py-3 px-10 rounded-full shadow-lg">
            <ThemedText className="text-white text-lg font-semibold">
              Edit Profile
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

export default MyProfile;
