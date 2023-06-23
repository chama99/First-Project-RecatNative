import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connexion from './Components/Connexion.js';
import Deconnexion from './Components/Deconnexion.js';
import Compte from './Components/Compte';
import Home from './Components/Home.js';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
      <Stack.Screen name="Compte" component={Compte} options={{ headerTitle: '',  }} />
     
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> 
      <Stack.Screen name="Deconnexion" component={Deconnexion} options={{ headerShown: false }} />

      
    </Stack.Navigator>
  );
}

export default function MainApp() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}
