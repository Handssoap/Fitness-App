import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { useProfile } from '@/ProfileContext';

export default function TrackMeals() {

  const { profile } = useProfile(); 

  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");

  const router = useRouter();


  const saveMeal = () => {
    if (!mealName || !calories) {
      Alert.alert("Error", "Please fill in both fields.");
      return;
    }

    // save meal data
    console.log("Meal Saved:", { mealName, calories });
    Alert.alert("Success", "Meal saved successfully!");

    // reset the form
    setMealName("");
    setCalories("");
  };

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} /> {/* Hide header */}
    
    <ParallaxScrollView
        headerBackgroundColor={{ light: '#FFA44C', dark: '#FFA44C' }}
        headerImage={
            <View className="justify-center items-center pt-12 bg-gradient-to-b from-yellow-400 to-orange-500">
                <Ionicons name="restaurant-outline" size={120} color="#fff" />
            </View>
        }>
        
        <ThemedView>

          <ThemedText type="title" className="text-center text-white mb-8">
            Track Meals
          </ThemedText>

          <TextInput
            className="w-full p-4 mb-4 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg"
            placeholder="Enter Meal Name"
            placeholderTextColor="#888"
            value={mealName}
            onChangeText={setMealName}
          />

          <TextInput
            className="w-full p-4 mb-4 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg"
            placeholder="Enter Calories"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />

          <TouchableOpacity onPress={saveMeal} className="bg-blue-500 p-4 rounded-lg">
            <ThemedText className="text-center text-white font-bold">
              Save Meal
            </ThemedText>
          </TouchableOpacity>

        </ThemedView>
            

    </ParallaxScrollView>
</>
  );
}
