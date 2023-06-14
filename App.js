import React  from 'react';
import { View } from 'react-native';
import Profil from './Components/Profil.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from './Components/Screen1'
import Compte from './Components/Compte'
const Stack = createNativeStackNavigator();

 function App() {
  return (
   
      <Stack.Navigator>
      <Stack.Screen name="Profil" component={Profil} options={{ headerShown: false }} />
        <Stack.Screen name="Compte" component={Compte} />

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

