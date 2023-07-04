import React, { useState } from 'react';
import { TextInput, Text, SafeAreaView, Alert, View, TouchableOpacity } from 'react-native';
import appStyles from '../styles/appStyles';
import formStyles from '../styles/formStyles';

import axios from 'axios';

const ResetPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
  

    const handleEmailChange = (text) => {
        setEmail(text);
    };

   

    const forgetPassword = async () => {
        try {
            const response = await axios.post('http://192.168.30.152:80/ForgetPassword', {
                email,

            });

            return Promise.resolve(response.data);

        } catch (error) {
            return Promise.reject({ error });
        }
    };

    
    const Envoyer = async () => {
        try {
            const response = await forgetPassword();
            console.log(response)

            if (response.mssg === "email n'existe pas" ) {
                Alert.alert('Erreur', response);

            } else {
                
                Alert.alert('Succès', response);
                setEmail('')
            }

        } catch (error) {
            console.log('Error:', error);
        }

    };
   

    return (
        <SafeAreaView style={appStyles.container}>
            <Text style={formStyles.text}>Trouvez votre compte</Text>
            <Text>Veuillez entrer votre adresse e-mail pour rechercher votre compte :</Text>
            <TextInput
                style={formStyles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={handleEmailChange}
            />

            <TouchableOpacity onPress={Envoyer} style={formStyles.button}>
                <Text style={formStyles.buttonText}>Envoyer</Text>
            </TouchableOpacity>
           

        </SafeAreaView>
    );
};

export default ResetPassword;
