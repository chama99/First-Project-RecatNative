import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, Text, SafeAreaView, Alert } from 'react-native';
import appStyles from '../styles/appStyles';
import formStyles from '../styles/formStyles'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const Connexion = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const login = async () => {
        try {
            const response = await axios.post('http://192.168.1.16:6000/login', {
              email,
              password
            });

           
            // Stocker le jeton d'accès localement avec AsyncStorage
            

            // Faire d'autres actions après la connexion réussie
            // Par exemple, naviguer vers une autre vue
            return Promise.resolve(response.data);
           
        } catch (error) {
            return Promise.reject({ error });
        }
    };
    const Test = async () => {
        try {
            const response = await login();
          
            if (response.token === "Mot de passe ou email invalide") {
                Alert.alert('Erreur', response.token);
            } else {
                // Stocker le jeton d'accès localement avec AsyncStorage
               await AsyncStorage.setItem('accessToken', response.token);

                console.log('Token:', response.user); // Afficher le jeton dans la console
                navigation.navigate('Home',{ user: response.user });
            }

        } catch (error) {
            console.log('Error:', error);
        }

    }
    const goToCreateAccount = () => {
        navigation.navigate('ImageUpload');
    };

    return (
        <SafeAreaView style={appStyles.container}>
            <Text style={formStyles.text}>Connexion</Text>

            <TextInput
                style={formStyles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleEmailChange}
            />
            <TextInput
                style={formStyles.input}
                placeholder="Mot de passe"
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
            />
            <TouchableOpacity style={formStyles.button} onPress={Test}>
                <Text style={formStyles.buttonText}>S'identifier</Text>
            </TouchableOpacity>
            <Text style={formStyles.textc}>Mot de passe oublié ?</Text>
            <TouchableOpacity onPress={goToCreateAccount}>
                <Text style={formStyles.textc}><Text style={formStyles.col}>Ne pas avoir de compte ?</Text> S'inscrire</Text>
            </TouchableOpacity>
            <Image source={require('../assets/profil.png')} style={formStyles.image} />
        </SafeAreaView>
    );
};

export default Connexion;
