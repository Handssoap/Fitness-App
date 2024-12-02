// File: app/log_workout.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '../../../components/ThemedText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, router, Stack } from 'expo-router';
import useAuthAdapter from '../../../hooks/useAuth';

const LogWorkout = () => {
    // State to hold workouts
    const [workouts, setWorkouts] = useState([]);
    const { isLoaded, userId } = useAuthAdapter();

    useEffect(() => {
        // Fetch workouts from your data source here
        // For demonstration, we'll use mock data
        const fetchWorkouts = async (id: string) => {
            const res = await fetch("http://localhost:3001/workout/workout_templates?userId=" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            setWorkouts(await res.json())
        };
        if (isLoaded) {
            fetchWorkouts(userId as string);
        }
    }, [userId]);

    const renderWorkout = ({ item }) => (
        <Link href={{
            pathname: "/log_workout/[id]",
            params: { id: item.id }
        }}
            className='bg-gray-800 rounded-xl p-4 mb-4'
        >
            <View className="flex-row items-center mb-3">
                <MaterialCommunityIcons name="dumbbell" size={24} color="#fff" />
                <Text className="text-white text-lg font-semibold ml-2">
                    {item.name}
                </Text>
            </View>
        </Link>
    );

    return (
        <View>
            <Stack.Screen options={{ headerShown: false }} /> {/* Hide header */}
            <ScrollView className="flex-1 bg-gray-900 min-h-screen px-4 pt-4">
                <ThemedText className="text-2xl font-bold text-white mb-4">
                    Your Workouts
                </ThemedText>
                <FlatList
                    data={workouts}
                    renderItem={renderWorkout}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: 16 }}
                />
            </ScrollView>
        </View>
    );
};

export default LogWorkout;
