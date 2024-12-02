import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";

export default function WorkoutPage() {
    const { id } = useLocalSearchParams();
    const [workout, setWorkout] = useState();

    useEffect(() => {
        const fetchWorkout = async (workoutId: string) => {
            const res = await fetch("http://localhost:3001/workout/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setWorkout(await res.json())
        }
        if (id) {
            fetchWorkout(id as string)
        }
    }, [])
    const renderWorkout = ({ item }) => (
        <View
            className='bg-gray-800 rounded-xl p-4 mb-4'
        >
            <View className="flex-row items-center mb-3">
                <Text className="text-white text-lg font-semibold ml-2">
                    {item.name}
                </Text>
                <Text className="text-white text-lg font-semibold ml-2">
                    {item.descriiption}
                </Text>
            </View>
            <View className="flex justify-between mb-2">
                <Text className="text-gray-300 text-base">{item.name}</Text>
                <Text className="text-gray-400 text-base">
                    {item.sets} sets x {item.reps} reps
                </Text>
                <View className="text-gray-400 text-base">
                    {item.description}
                </View>
            </View>
        </View>

    );
    return (
        <ScrollView className="bg-gray-900 py-4 space-y-3">
            <Text className="capitalize text-2xl font-bold text-white my-4"> {workout?.name} </Text>
            <FlatList
                data={workout?.exercises}
                renderItem={renderWorkout}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 16 }}
            />

        </ScrollView>
    )
}