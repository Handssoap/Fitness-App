import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ThemedText } from '../../components/ThemedText'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'

type CalorieCalculatorParams = {
    sex: string    // m for man and w for women
    weight: number // in kg
    height: number // in cm
    age: number
    activeness: number // Activeness 
}

type Activeness = {
    label: string,
    value: number,
}

const ActivenessList: Activeness[] = [
    { label: "Sometimes", value: 1.2, },
    { label: "Lightly Active", value: 1.375, },
    { label: "Moderately Active", value: 1.55, },
    { label: "Very Active", value: 1.725 },
    { label: "Extra Active", value: 1.9, }
]

export default function CalorieCalculator() {
    const [calories, setCalories] = useState<Number>();

    const [activeness, setActiveness] = useState<Number>();
    const [sex, setSex] = useState<"w" | "m">("m");
    const [weight, setWeight] = useState<Number>();
    const [height, setHeight] = useState<Number>();
    const [age, setAge] = useState<Number>();

    const handleSubmit = () => {
        if (sex && weight && height && age) {
            const result = calculateCalories(
                sex,
                weight as number,
                height as number,
                age as number,
                activeness as number
            )
            setCalories(result)
        }
    }

    return (
        <ScrollView className='p-4 gap-4'>
            <View className='my-3 space-y-2'>
                <Text className='text-4xl'> Calculate Calories </Text>
            </View>

            <View className='my-2 space-y-2'>
                <Text className='font-bold'> Age </Text>
                <TextInput className='p-2 placeholder:text-gray-700' placeholder='Enter age' onChangeText={a => setAge(Number(a))} />
            </View>

            <View className='my-2 space-y-2'>
                <Text className='font-bold'> Weight in kg </Text>
                <TextInput className='p-2 placeholder:text-gray-700' placeholder='Enter weight in kg.' onChangeText={a => setWeight(Number(a))} />
            </View>

            <View className='my-2 space-y-2'>
                <Text className='font-bold'> Height in kg </Text>
                <TextInput className='p-2 placeholder:text-gray-700' placeholder='Enter height in cm' onChangeText={a => setHeight(Number(a))} />
            </View>

            <View className='my-2 space-y-2'>
                <Text className='font-bold'> Sex </Text>
                <Picker
                    className='p-2 placeholder:text-gray-700'
                    selectedValue={sex}
                    onValueChange={a => setSex(a)}
                >
                    <Picker.Item label={"Male"} value={"m"} />
                    <Picker.Item label={"Female"} value={"w"} />
                </Picker>
            </View>

            <View className='my-2 space-y-2'>
                <Text> Activeness </Text>
                <Picker
                    className='p-2 placeholder:text-gray-700'
                    selectedValue={activeness}
                    onValueChange={a => setActiveness(a)}
                >
                    {
                        ActivenessList.map(a => (
                            <Picker.Item label={a.label} value={a.value} />
                        ))
                    }
                </Picker>
            </View>

            <View>
                <TouchableOpacity className="items-center bg-purple-500 py-2 flex-1 mx-1" onPress={handleSubmit}>
                    <Text className="text-gray-800 dark:text-white font-medium">
                        Calculate Calories
                    </Text>
                </TouchableOpacity>
            </View>

            <View className='my-2 flex-1 justify-center items-center'>
                <Text className='text-xl'> Total Daily Calorie  </Text>
                <Text className='text-6xl font-bold'>  {calories ? calories.toFixed(2) : ""} </Text>
            </View>

        </ScrollView>
    )
}



function calculateCalories(
    sex: string,
    weight: number,
    height: number,
    age: number,
    activeness: number,
) {
    return activeness * calculateBMR(sex, weight, height, age)
}

function calculateBMR(sex: string, weight: number, height: number, age: number): number {
    if (sex.toLowerCase() == "m") {
        //66.47 + (13.75 x weight in kg) + (5.003 x height in cm) - (6.755 x age in years)
        return 66.47 + (13.75 * weight) + (5.0003 * height) - (6.755 * age)
    } else if (sex.toLowerCase() == "w") {
        // 655.1 + (9.563 x weight in kg) + (1.850 x height in cm) - (4.676 x age in years
        return 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)
    }
}