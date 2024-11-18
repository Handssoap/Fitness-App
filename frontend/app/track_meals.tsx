import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { useProfile } from '@/ProfileContext';
import { Picker } from "@react-native-picker/picker";

export default function TrackMeals() {

  const { profile } = useProfile(); 

  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");

  const [description, setDescription] = useState("");

  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const mealTypes = ["breakfast", "lunch", "dinner", "snack"];


  const router = useRouter();


  const saveMeal = () => {
    if (!mealName || !calories) {
      Alert.alert("Error", "Please fill in required fields.");
      return;
    }

    // save meal data
    console.log("Meal Saved:", { mealName, calories });
    Alert.alert("Success", "Meal saved successfully!");

    // reset the form
    setMealName("");
    setCalories("");
    setDescription("");
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

          <TextInput
            className="w-full p-4 mb-4 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg"
            placeholder="Meal Description"
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
          />

          
          <ThemedText className="w-full p-4 mb-4 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg">
          Select Meal Type Below</ThemedText>

          <View className="w-full border border-gray-300 rounded-lg bg-white">
            <Picker
              selectedValue={selectedMeal}
              onValueChange={(itemValue) => setSelectedMeal(itemValue)}
              style={{ height: 50, width: '100%' }} // Adjust styles as needed
            >

              <Picker.Item label="Select a meal..." value={null} />
                  {mealTypes.map((meal) => (
                  <Picker.Item key={meal} label={meal.charAt(0).toUpperCase() + meal.slice(1)} value={meal} />
              ))}

            </Picker>
          </View>
          

          <TouchableOpacity onPress={saveMeal} className="bg-blue-500 mt-4 mb-4 p-4 rounded-lg">
            <ThemedText className="text-center text-white font-bold">
              Save Meal
            </ThemedText>
          </TouchableOpacity>

        </ThemedView>
            

    </ParallaxScrollView>
</>
  );
}
