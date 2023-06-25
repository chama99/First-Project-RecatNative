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

           
            
            return Promise.resolve(response.data);
           
        } catch (error) {
            return Promise.reject({ error });
        }
    };
    const Test = async () => {
        try {
            const response = await login();
            console.log(response)
          
            if (response.mssg === "Mot de passe ou email invalide") {
                Alert.alert('Erreur', response.mssg);
            } else {
                // Stocker le jeton d'accès localement avec AsyncStorage
               await AsyncStorage.setItem('accessToken', response.token);

                console.log('Token:', response.user);
                setEmail('');
                setPassword('');
                navigation.navigate('Home',{ id: response.user._id });
                
            }
            
        } catch (error) {
            console.log('Error:', error);
        }

    }
    const goToCreateAccount = () => {
        navigation.navigate('Compte');
    };
   

    return (
        <SafeAreaView style={appStyles.container}>
            <Text style={formStyles.text}>Connexion</Text>

            <TextInput
                style={formStyles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={handleEmailChange}
            />
            <TextInput
                style={formStyles.input}
                placeholder="Mot de passe"
                secureTextEntry={true}
                value={password}
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
