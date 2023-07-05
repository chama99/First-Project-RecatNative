import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, Text, SafeAreaView, Alert, View } from 'react-native';
import appStyles from '../styles/appStyles';
import formStyles from '../styles/formStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Connexion = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const login = async () => {
        try {
            const response = await axios.post('http://192.168.30.152:80/login', {
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

            if (response.mssg === "Mot de passe ou email invalide" || response.mssg === "L'e-mail n'a pas été vérifié.") {
                Alert.alert('Erreur', response.mssg);
               
            } else {
                // Stocker le jeton d'accès localement avec AsyncStorage
                await AsyncStorage.setItem('accessToken', response.token);

                console.log('Token:', response.user);
                setEmail('');
                setPassword('');
                navigation.navigate('Home', { id: response.user._id });

            }

        } catch (error) {
            console.log('Error:', error);
        }

    };

    const goToCreateAccount = () => {
        navigation.navigate('Compte');
    };

    const goToForgetPassword = () => {
        navigation.navigate('ResetPassword');
    };

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    return (
        <View style={appStyles.container}>
            <Image source={require('../assets/whitecape1.png')} style={formStyles.image} />
            <TextInput
                style={formStyles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={handleEmailChange}
            />

          
            <View style={formStyles.passwordIconContainer}>
                <TextInput
                    style={formStyles.passwordInput}
                    placeholder="Mot de passe"
                    secureTextEntry={hidePassword}
                    value={password}
                    onChangeText={handlePasswordChange}
                />
                <TouchableOpacity style={formStyles.passwordIcon} onPress={togglePasswordVisibility}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={24} color="black" />
                </TouchableOpacity>
            </View>
               
          

            <TouchableOpacity style={formStyles.button} onPress={Test}>
                <Text style={formStyles.buttonText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToForgetPassword}>
                <Text style={formStyles.textc}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
           

            <TouchableOpacity onPress={goToCreateAccount}>
                <Text> <Text style={formStyles.col}>Ne pas avoir de compte ?</Text><Text style={formStyles.textc}> S'inscrire</Text></Text> 
            </TouchableOpacity>

           
        </View>
    );
};

export default Connexion;