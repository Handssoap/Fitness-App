import React, { useMemo } from 'react';
import { ScrollView, View, TouchableOpacity, Image, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SignedIn, SignedOut, useUser, useAuth, useClerk } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

function Home() {
  const { user } = useUser(); // Access the user object
  const { signOut } = useAuth(); // Access signOut function
  const clerk = useClerk(); // Access Clerk methods
  const navigation = useNavigation(); // Navigation hook if needed

  const userName = user?.firstName || 'Guest'; // Get the user's first name

  // Function to handle sign-in
  const handleSignIn = () => {
    clerk.openSignIn(); // Opens Clerk's sign-in screen
    // Alternatively, navigate to your custom sign-in screen:
    // navigation.navigate('SignIn');
  };

  // Function to handle sign-out
  const handleSignOut = () => {
    signOut();
  };

  // Time-based greeting
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const greeting = getGreeting();

  // Inspirational quotes array
  const quotes = [
    "Your limitation—it's only your imagination.",
    'Push yourself, because no one else is going to do it for you.',
    'Great things never come from comfort zones.',
    'Dream it. Wish it. Do it.',
    "Success doesn't just find you. You have to go out and get it.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Don't stop when you're tired. Stop when you're done.",
    'Do something today that your future self will thank you for.',
    'Little things make big days.',
    "It's going to be hard, but hard does not mean impossible.",
  ];

  // Select a random quote
  const randomQuote = useMemo(() => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, []);

  return (
    <ScrollView className="flex-1 bg-white dark:bg-gray-900">
      {/* Top Bar with Sign-In/Sign-Out Button */}
      <View className="flex-row justify-end items-center p-4">
        <SignedIn>
          <View className="flex-row items-center">
            {user?.profileImageUrl ? (
              <Image
                source={{ uri: user.profileImageUrl }}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <MaterialIcons name="account-circle" size={24} color="#fff" />
            )}
            <Text className="ml-2 text-base font-medium text-gray-800 dark:text-white">
              Hello, {userName}!
            </Text>
            <TouchableOpacity
              onPress={handleSignOut}
              className="ml-2 bg-red-500 px-2 py-2 rounded-full"
            >
              <Text className="text-white font-semibold">Sign Out</Text>
            </TouchableOpacity>
          </View>
        </SignedIn>
        <SignedOut>
          <TouchableOpacity
            onPress={handleSignIn}
            className="flex-row items-center bg-blue-500 px-3 py-2 rounded-full"
          >
            <MaterialIcons name="login" size={24} color="#fff" />
            <Text className="ml-2 text-white font-semibold">Sign In</Text>
          </TouchableOpacity>
        </SignedOut>
      </View>

      {/* Header with Background Image */}
      <View className="relative h-56">
        <Image
          source={{ uri: 'https://example.com/header-image.jpg' }}
          className="absolute w-full h-full object-cover rounded-b-3xl opacity-90"
        />
        <View className="absolute bottom-5 left-5">
          <ThemedText className="text-2xl font-bold text-white shadow-lg">
            {greeting}, {userName}!
          </ThemedText>
          <ThemedText className="text-lg text-white italic mt-1">
            "{randomQuote}"
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
          <View className="bg-blue-600 p-4 rounded-full shadow-lg">
          <MaterialCommunityIcons name="dumbbell" size={28} color="#fff" />
            </View>
            <ThemedText className="mt-2 text-gray-800 dark:text-white font-medium">
              Log Workout
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1 mx-1" onPress={() => router.push('/calorie_calculator')}>
          <View className="bg-blue-600 p-4 rounded-full shadow-lg">
          <MaterialCommunityIcons name="calculator" size={28} color="#fff" />
            </View>
            <ThemedText className="mt-2 text-gray-800 dark:text-white font-medium">
              Calorie Calculator
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
          
          <TouchableOpacity className="items-center flex-1 mx-1" onPress={() => router.push('add_workout/workouts')}>
            
              <View className="bg-green-500 p-4 rounded-full shadow-lg">
              <Ionicons name="add-circle-outline" size={28} color="#fff" />
            </View>
            <ThemedText className="mt-2 text-gray-800 dark:text-white font-medium">
              Create a Workout
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
