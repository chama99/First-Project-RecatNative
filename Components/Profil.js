import React, { useState } from 'react';
import { Image, View, TextInput, TouchableOpacity, Text ,Button} from 'react-native';
import appStyles from '../styles/appStyles';
import formStyles from '../styles/formStyles';

const Profil = ({navigation}) => {
    const [password, setPassword] = useState('');
    const goToCreateAccount = () => {
        navigation.navigate('Compte');
    };


    return (
        <View style={appStyles.container}>
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
                <Text style={formStyles.buttonText}>Soumettre</Text>
            </TouchableOpacity>
           
            <Button title="Créer un compte" onPress={goToCreateAccount} />
            <Text>Mot de passe oublié ?</Text>
            
            <Image source={require('../assets/profil.png')} style={formStyles.image} />
        </View>
    );
};

export default Profil;
