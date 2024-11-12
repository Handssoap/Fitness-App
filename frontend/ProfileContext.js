// ProfileContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context
const ProfileContext = createContext();

// Provider component to wrap the app
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: 'Name',
    email: 'Email',
    age: 'Age',            // Added age
    height: 'Height',        // Added height
    weight: 'Weight',         // Added weight
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use profile context
export const useProfile = () => useContext(ProfileContext);
