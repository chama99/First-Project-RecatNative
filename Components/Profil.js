import React, { useState } from 'react';
import { Image, View, TextInput, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import appStyles from '../styles/appStyles';
import formStyles from '../styles/formStyles';

const Profil = ({navigation}) => {
    const [password, setPassword] = useState('');
    const goToCreateAccount = () => {
        navigation.navigate('Compte');
    };


    return (
        <SafeAreaView  style={appStyles.container}>
            <Text style={formStyles.text}>Connexion</Text>

            <TextInput
                style={formStyles.input}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                style={formStyles.input}
                placeholder="Mot de passe"
                secureTextEntry={true}
              
            />
            <TouchableOpacity style={formStyles.button}>
                <Text style={formStyles.buttonText}>S'identifier</Text>
            </TouchableOpacity>
            <Text style={formStyles.textc}>Mot de passe oublié ?</Text>
            <TouchableOpacity onPress={goToCreateAccount}>
                <Text style={formStyles.textc}> <Text style={formStyles.col}>Ne pas avoir de compte ?</Text> S'inscrire</Text>
            </TouchableOpacity>
            <Image source={require('../assets/profil.png')} style={formStyles.image} />
        </SafeAreaView>
    );
};

export default Profil;
