import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { useProfile } from '@/ProfileContext';

export default function TrackMeals() {

  const { profile } = useProfile(); 
  const router = useRouter();

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
          <ThemedText type="title" className="text-center text-white">
              Track Meals
            </ThemedText>
        </ThemedView>
            

    </ParallaxScrollView>
</>
  );
}
