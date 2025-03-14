import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';

import { RootStackParamList } from './types';




const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignUp" component={SignUpScreen}  options={{ headerShown: false }} 
        
 />
 
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }}  />
      
        
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
