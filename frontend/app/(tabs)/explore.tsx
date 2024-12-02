import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TextInput as RNTextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
const targetMuscles = [
  'abs',
  'quads',
  'lats',
  'calves',
  'pectorals',
  'glutes',
  'hamstrings',
  'adductors',
  'triceps',
  'cardiovascular system',
  'spine',
  'upper back',
  'biceps',
  'delts',
  'forearms',
  'traps',
  'serratus anterior',
  'abductors',
  'levator scapulae',
];

const goals = [
  'weight_loss',
  'muscle_gain',
  'strength_training',
  'cardiovascular_endurance',
  'flexibility',
  'general_fitness',
];
const WorkoutPlannerPage = () => {
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [target, setTarget] = useState('');
  const [goal, setGoal] = useState('');
  const [routine, setRoutine] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const apiKey = Constants.expoConfig?.extra?.apiKey;
  const handleSubmit = async () => {
    console.log('handleSubmit called');
    if (!gender || !weight || !target || !goal) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true);
    setRoutine([]);

    try {
      const response = await fetch(
        `https://zylalabs.com/api/392/exercise+database+api/4824/ai+workout+planner?target=${encodeURIComponent(
          target
        )}&gender=${encodeURIComponent(
          gender
        )}&weight=${encodeURIComponent(weight)}&goal=${encodeURIComponent(goal)}`,
        {
          method: 'GET',
          headers: {
            Authorization: "Bearer",
          },
        }
        
      );
      console.log('Response status:', response.status);
      console.log('REACT_APP_API_KEY:', process.env.REACT_APP_API_KEY);
      const data = await response.json();

      if (data && data.status) {
        // Parse the routine string into an array of lines
        const routineText = data.routine[0];
        const routineLines = routineText
          .split('\n')
          .filter((line: string) => line.trim() !== '');
        setRoutine(routineLines);
        console.log('Routine set successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to get workout routine.');
      }
    } catch (err: any) {
      console.log('Error in handleSubmit:', err);
      Alert.alert(
        'Error',
        err.message || 'An error occurred while fetching the workout routine.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} className="p-4">
        <Text className="text-3xl font-bold text-center mb-6">AI Workout Planner</Text>

        {/* Gender Picker */}
        <View className="mb-4">
          <Text className="text-lg mb-2">Gender</Text>
          <View className="border border-gray-300 rounded">
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
            </Picker>
          </View>
        </View>

        {/* Weight Input */}
        <View className="mb-4">
          <Text className="text-lg mb-2">Weight (kg)</Text>
          <RNTextInput
            className="border border-gray-300 rounded p-2"
            keyboardType="numeric"
            value={weight}
            onChangeText={(text) => setWeight(text)}
            placeholder="Enter your weight in kg"
          />
        </View>

        {/* Target Muscle Picker */}
        <View className="mb-4">
          <Text className="text-lg mb-2">Target Muscle</Text>
          <View className="border border-gray-300 rounded">
            <Picker
              selectedValue={target}
              onValueChange={(itemValue) => setTarget(itemValue)}
            >
              <Picker.Item label="Select Muscle" value="" />
              {targetMuscles.map((muscle) => (
                <Picker.Item
                  key={muscle}
                  label={muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                  value={muscle}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Goal Picker */}
        <View className="mb-4">
          <Text className="text-lg mb-2">Goal</Text>
          <View className="border border-gray-300 rounded">
            <Picker
              selectedValue={goal}
              onValueChange={(itemValue) => setGoal(itemValue)}
            >
              <Picker.Item label="Select Goal" value="" />
              {goals.map((g) => (
                <Picker.Item
                  key={g}
                  label={
                    g.replace('_', ' ').charAt(0).toUpperCase() +
                    g.replace('_', ' ').slice(1)
                  }
                  value={g}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className="bg-blue-500 py-3 rounded-md mt-4"
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-center text-white text-lg font-semibold">
              Get Workout Plan
            </Text>
          )}
        </TouchableOpacity>

        {/* Workout Routine Display */}
        {routine.length > 0 ? (
          <View className="mt-8">
            <Text className="text-2xl font-bold mb-4">Your Workout Plan:</Text>
            {routine.map((line, index) => {
              // Simple parsing to format headings and lists
              if (line.startsWith('**') && line.endsWith('**')) {
                // Bold headings
                return (
                  <Text key={index} className="text-xl font-bold mt-4">
                    {line.replace(/\*\*/g, '')}
                  </Text>
                );
              } else if (/^\d+\./.test(line)) {
                // Numbered lists
                return (
                  <Text key={index} className="ml-4">
                    {line}
                  </Text>
                );
              } else if (line.startsWith('-')) {
                // Bullet points
                return (
                  <Text key={index} className="ml-4">
                    {line}
                  </Text>
                );
              } else {
                // Regular text
                return (
                  <Text key={index} className="mt-2">
                    {line}
                  </Text>
                );
              }
            })}
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WorkoutPlannerPage;
