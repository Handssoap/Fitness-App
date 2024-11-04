import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemedText, ThemedView } from '@/components/ThemedText';
import { useProfile } from '@/ProfileContext';

export default function EditProfile() {
  const { profile, setProfile } = useProfile(); // Access and update profile data
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [age, setAge] = useState(profile.age); // New field
  const [height, setHeight] = useState(profile.height); // New field
  const [weight, setWeight] = useState(profile.weight); // New field
  const navigation = useNavigation();

  const saveProfile = () => {
    setProfile({ name, email, age, height, weight }); // Update context data with new fields
    navigation.goBack(); // Navigate back to MyProfile after saving
  };

  return (
    <ThemedView className="p-5">
      <ThemedText type="title" className="text-3xl text-center mb-6">
        Edit Profile
      </ThemedText>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input} // Apply yellow text color
        className="mb-4 p-3 border rounded-md"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input} // Apply yellow text color
        className="mb-4 p-3 border rounded-md"
      />
      <TextInput
        placeholder="Age"
        value={age.toString()}
        onChangeText={(text) => setAge(parseInt(text) || 0)}
        keyboardType="numeric"
        style={styles.input} // Apply yellow text color
        className="mb-4 p-3 border rounded-md"
      />
      <TextInput
        placeholder="Height (cm)"
        value={height.toString()}
        onChangeText={(text) => setHeight(parseFloat(text) || 0)}
        keyboardType="numeric"
        style={styles.input} // Apply yellow text color
        className="mb-4 p-3 border rounded-md"
      />
      <TextInput
        placeholder="Weight (kg)"
        value={weight.toString()}
        onChangeText={(text) => setWeight(parseFloat(text) || 0)}
        keyboardType="numeric"
        style={styles.input} // Apply yellow text color
        className="mb-4 p-3 border rounded-md"
      />
      <Button title="Save Changes" onPress={saveProfile} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  input: {
    color: '#FFD700', // Set text color to yellow
  },
});
