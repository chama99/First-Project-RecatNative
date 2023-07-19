import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Connexion from './Views/Connexion.js';
import Deconnexion from './Views/Deconnexion.js';
import Compte from './Views/Compte';
import Home from './Views/Home.js';
import UpdateProfil from './Views/Updateprofil.js';
import Profil from './Views/profil.js';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Password from './Views/changepasword.js';
import Accueil from './Views/Accueil.js'
import ResetPassword from './Views/forgetpassword.js'
import CreatePost from './Views/CreatePost.js'
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
      <Stack.Screen name="Compte" component={Compte} options={{ headerTitle: '',  }} />
     
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} /> 
      <Stack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} /> 
      <Stack.Screen name="CreatePost" component={CreatePost} options={{ headerTitle: 'Créer une publication', }} />
      <Stack.Screen name="Profil" component={Profil} options={{ headerTitle: '', }} />
      <Stack.Screen name="Deconnexion" component={Deconnexion} options={{ headerShown: false }} />
      <Stack.Screen name="UpdateProfil" component={UpdateProfil}  />
      <Stack.Screen name="Password" component={Password} options={{ headerTitle: '', }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerTitle: '', }} />
      

      
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
