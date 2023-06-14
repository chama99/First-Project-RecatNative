import React  from 'react';
import { View } from 'react-native';
import Connexion from './Components/Connexion.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Compte from './Components/Compte'
const Stack = createNativeStackNavigator();

 function App() {
  return (
   
    <Stack.Navigator >
      <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
      <Stack.Screen name="Compte" component={Compte} options={{ headerTitle: '' }}  />

    </Stack.Navigator>
  );
}
export default ()=>{
  return(
    <NavigationContainer>
      <App/>
      </NavigationContainer>
  )
}

