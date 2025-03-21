import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import check from './screens/check';

import { RootStackParamList } from './types';
import ProfileScreen from './screens/ProfileScreen';




const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignUp" component={SignUpScreen}  options={{ headerShown: false }} 
        
 />
 
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}  />
        <Stack.Screen name="check" component={check} options={{ headerShown: false }}  />
      
        
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
