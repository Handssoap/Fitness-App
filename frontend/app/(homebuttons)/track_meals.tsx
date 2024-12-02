import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { useProfile } from '@/ProfileContext';
import { Picker } from '@react-native-picker/picker';


export default function TrackMeals() {
  const { profile } = useProfile();
  const NUTRITION_API_KEY = process.env.EXPO_PUBLIC_API_KEY_WORKOUTS;
  const [mealName, setMealName] = useState('');
  const [mealType, setMealType] = useState<string | null>(null);
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const [nutritionData, setNutritionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [description, setDescription] = useState('');

  const [error, setError] = useState('');

  // Function to fetch nutrition data
  const fetchNutritionData = async () => {
    if (!mealName.trim()) {
      Alert.alert('Error', 'Please enter a meal name.');
      return;
    }

    setLoading(true);
    setError('');
    setNutritionData([]);

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/nutrition?query=${encodeURIComponent(
          mealName
        )}`,
        {
          headers: { 'X-Api-Key': NUTRITION_API_KEY },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch nutrition data.');
      }

      const data = await response.json();

      if (data.length === 0) {
        setError('No nutrition data found for the entered meal.');
      } else {
        setNutritionData(data);
      }
    } catch (err) {
      console.error('Error fetching nutrition data:', err);
      setError('An error occurred while fetching nutrition data.');
    } finally {
      setLoading(false);
    }
  };

  // Function to save meal
  const saveMeal = () => {
    if (!mealName || nutritionData.length === 0 || !mealType) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Save meal data (implement saving logic here)
    console.log('Meal Saved:', { mealName, mealType, nutritionData });
    Alert.alert('Success', 'Meal saved successfully!');

    // Reset the form
    setMealName('');
    setMealType(null);
    setDescription('');
    setNutritionData([]);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ParallaxScrollView
        headerBackgroundColor={{ light: '#FFA44C', dark: '#FFA44C' }}
        headerImage={
          <View className="justify-center items-center pt-12 bg-gradient-to-b from-yellow-400 to-orange-500">
            <Ionicons name="restaurant-outline" size={120} color="#fff" />
          </View>
        }
      >
        <ScrollView className="px-4">
          <ThemedText type="title" className="text-center text-white mb-8">
            Track Meals
          </ThemedText>

          {/* Meal Name Input */}
          <TextInput
            className="w-full p-4 mb-4 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg"
            placeholder="Enter Meal Name"
            placeholderTextColor="#888"
            value={mealName}
            onChangeText={setMealName}
          />

          {/* Meal Type Picker */}
          <View className="w-full mb-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
            <Picker
              selectedValue={mealType}
              onValueChange={(itemValue) => setMealType(itemValue)}
              style={{
                color: mealType ? '#000' : '#888',
                backgroundColor: 'transparent',
                fontSize: 18,
                fontFamily: 'Inter_400Regular',
                fontWeight: 'bold',
              }}
              dropdownIconColor="#888"
            >
              <Picker.Item label="Select Meal Type..." value={null} />
              {mealTypes.map((meal) => (
                <Picker.Item key={meal} label={meal} value={meal} />
              ))}
            </Picker>
          </View>

          {/* Fetch Nutrition Data Button */}
          <TouchableOpacity
            onPress={fetchNutritionData}
            className="bg-blue-500 mt-2 mb-4 p-4 rounded-lg"
          >
            <ThemedText className="text-center text-white font-bold">
              Fetch Nutrition Data
            </ThemedText>
          </TouchableOpacity>

          {/* Loading Indicator */}
          {loading && (
            <View className="mb-4">
              <ActivityIndicator size="large" color="#FFA44C" />
            </View>
          )}

          {/* Error Message */}
          {error !== '' && (
            <Text className="text-red-500 text-center mb-4">{error}</Text>
          )}

          {/* Nutrition Data Display */}
          {nutritionData.length > 0 && (
            <View className="mb-4">
              <ThemedText className="text-lg font-bold mb-2">
                Nutrition Information:
              </ThemedText>
              {nutritionData.map((item, index) => (
                <View
                  key={index}
                  className="mb-4 p-4 bg-gray-100 dark:bg-black rounded-lg"
                >
                  <Text className="text-lg mb-2 text-cyan-500 font-mono font-bold">
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Text>
                  <Text className="text-m mb-2 text-cyan-500 font-mono font-bold">
                    Total Fat: {item.fat_total_g} g
                  </Text>
                  <Text className="text-sm mb-2 text-cyan-500 font-mono font-bold">
                    Saturated Fat: {item.fat_saturated_g} g
                  </Text>
                  <Text className="text-sm mb-2 text-cyan-500 font-mono font-bold">Sodium: {item.sodium_mg} mg</Text>
                  <Text className="text-sm mb-2 text-cyan-500 font-mono font-bold">
                    Potassium: {item.potassium_mg} mg
                  </Text>
                  <Text className="text-sm mb-2 text-cyan-500 font-mono font-bold">
                    Cholesterol: {item.cholesterol_mg} mg
                  </Text>
                  <Text className="text-sm mb-2 text-cyan-500 font-mono font-bold">
                    Total Carbohydrates: {item.carbohydrates_total_g} g
                  </Text>
                  <Text className="text-sm mb-2 text-cyan-500 font-mono font-bold">Fiber: {item.fiber_g} g</Text>
                  <Text className="text-sm mb-2 text-cyan-500 font-mono font-bold">Sugar: {item.sugar_g} g</Text>
                </View>
              ))}
            </View>
          )}

          {/* Meal Description Input */}
          <TextInput
            className="w-full p-4 mb-4 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg"
            placeholder="Meal Description"
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          {/* Save Meal Button */}
          <TouchableOpacity
            onPress={saveMeal}
            className="bg-green-500 mt-2 mb-4 p-4 rounded-lg"
          >
            <ThemedText className="text-center text-white font-bold">
              Save Meal
            </ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ParallaxScrollView>
    </>
  );
}
