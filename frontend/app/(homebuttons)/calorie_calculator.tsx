import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Stack } from 'expo-router';

type Activeness = {
  label: string;
  value: number;
};

const ActivenessList: Activeness[] = [
  { label: 'Sedentary (Little or no exercise)', value: 1.2 },
  { label: 'Lightly Active (Light exercise/sports 1-3 days/week)', value: 1.375 },
  { label: 'Moderately Active (Moderate exercise/sports 3-5 days/week)', value: 1.55 },
  { label: 'Very Active (Hard exercise/sports 6-7 days a week)', value: 1.725 },
  { label: 'Extra Active (Very hard exercise & physical job)', value: 1.9 },
];

export default function CalorieCalculator() {
  const [calories, setCalories] = useState<number | null>(null);

  const [activeness, setActiveness] = useState<number>(1.2);
  const [sex, setSex] = useState<'w' | 'm'>('m');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');

  const handleSubmit = () => {
    if (sex && weight && height && age && activeness) {
      const result = calculateCalories(
        sex,
        parseFloat(weight),
        parseFloat(height),
        parseFloat(age),
        activeness
      );
      setCalories(result);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView className="flex-1 bg-white dark:bg-gray-900">
        <View className="p-6">
          <Text className="text-4xl font-bold text-center text-purple-600 mb-8">
            Calorie Calculator
          </Text>

          {/* Age Input */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Age
            </Text>
            <TextInput
              className="border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800"
              placeholder="Enter your age"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={age}
              onChangeText={(text) => setAge(text)}
            />
          </View>

          {/* Weight Input */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Weight (kg)
            </Text>
            <TextInput
              className="border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800"
              placeholder="Enter your weight in kg"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={weight}
              onChangeText={(text) => setWeight(text)}
            />
          </View>

          {/* Height Input */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Height (cm)
            </Text>
            <TextInput
              className="border border-gray-300 dark:border-gray-700 rounded-md p-3 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800"
              placeholder="Enter your height in cm"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={height}
              onChangeText={(text) => setHeight(text)}
            />
          </View>

          {/* Sex Picker */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Sex
            </Text>
            <View className="border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
              <Picker
                selectedValue={sex}
                onValueChange={(value) => setSex(value)}
                mode="dropdown"
                dropdownIconColor="#888"
                style={{ color: '#888' }}
              >
                <Picker.Item label="Male" value="m" />
                <Picker.Item label="Female" value="w" />
              </Picker>
            </View>
          </View>

          {/* Activeness Picker */}
          <View className="mb-4">
            <Text className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Activeness
            </Text>
            <View className="border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800">
              <Picker
                selectedValue={activeness}
                onValueChange={(value) => setActiveness(value)}
                mode="dropdown"
                dropdownIconColor="#888"
                style={{ color: '#888' }}
              >
                {ActivenessList.map((item) => (
                  <Picker.Item key={item.value} label={item.label} value={item.value} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Calculate Button */}
          <TouchableOpacity
            className="bg-purple-600 py-4 rounded-md mt-6"
            onPress={handleSubmit}
          >
            <Text className="text-center text-white text-lg font-semibold">
              Calculate Calories
            </Text>
          </TouchableOpacity>

          {/* Result Display */}
          {calories !== null && (
            <View className="mt-8 bg-purple-100 dark:bg-purple-900 p-6 rounded-md">
              <Text className="text-2xl font-bold text-center text-purple-800 dark:text-purple-200">
                Total Daily Calorie Intake
              </Text>
              <Text className="text-5xl font-extrabold text-center text-purple-800 dark:text-purple-200 mt-4">
                {calories.toFixed(2)}
              </Text>
              <Text className="text-center text-gray-600 dark:text-gray-400 mt-2">
                kcal/day
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

function calculateCalories(
  sex: string,
  weight: number,
  height: number,
  age: number,
  activeness: number
) {
  return activeness * calculateBMR(sex, weight, height, age);
}

function calculateBMR(sex: string, weight: number, height: number, age: number): number {
  if (sex.toLowerCase() === 'm') {
    // Male BMR formula
    return 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
  } else if (sex.toLowerCase() === 'w') {
    // Female BMR formula
    return 655.1 + 9.563 * weight + 1.850 * height - 4.676 * age;
  } else {
    return 0;
  }
}
