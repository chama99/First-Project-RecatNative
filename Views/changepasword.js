import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import bcrypt from 'bcryptjs';

import formStyles from '../styles/passwordStyles';

import axios from 'axios';

export async function ModifierPassword(id, password) {
    try {
        const response = await axios.patch('http://192.168.137.66:80/UpdatePassword', { id,password});
        return Promise.resolve(response.data); // Renvoyer la réponse du serveur
    } catch (error) {
        return Promise.reject({ error });
    }
}
const comparePassword = (password, hashedPassword) => {
    const match = bcrypt.compareSync(password,hashedPassword);
    return match;
};


function Password({ route }) {
    const { user} = route.params;
    
    const [actuelpassword, setActuelpassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
   




    
   
    
    const handleActuelpasswordChange = (text) => {
       setActuelpassword(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
    };

    const handleCreateAccount = async () => {
        

        if (actuelpassword === '') {
            Alert.alert('Erreur', "S'il vous plaît entrez votre mot de passe actuel");
            return;
        }
       

        const isMatch = comparePassword(actuelpassword,user.password);
        if (isMatch) {
            console.log('Mot de passe correct');
        } else {
            console.log('Mot de passe incorrect');
            Alert.alert('Erreur', 'Mot de passe  actuel incorrect');
            return;
        }
        if (password === '') {
            Alert.alert('Erreur', "S'il vous plaît entrez votre nouveau mot de passe.");
            return;
        }

        if (confirmPassword === '') {
            Alert.alert('Erreur', "Veuillez confirmer votre mot de passe.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
            return;
        }
        if (!validatePassword(password)) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins un symbole, une lettre majuscule et avoir une longueur minimale de 8 caractères');
            return;
        }

       
        try {
            const id=user._id ;
            const response = await ModifierPassword(id, password);
            console.log('Server response:', response.mssg);
            
                Alert.alert('Succès',response.mssg)
                
                setActuelpassword('');
                setPassword('');
                setConfirmPassword('');
               
            

        } catch (error) {
            console.log('Error:', error);
        }




    };

    
    const validatePassword = (password) => {

        const symbolRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
        const uppercaseRegex = /[A-Z]/;
        return symbolRegex.test(password) && uppercaseRegex.test(password) && password.length >= 8;
    };
    return (
        <View style={formStyles.container}>
           
            <View style={formStyles.contentContainer}>
                <Text style={formStyles.text}>Changer le mot de passe</Text>
                <TextInput
                    style={formStyles.input}
                    placeholder="Mot de passe actuel"
                    value={actuelpassword}
                    onChangeText={handleActuelpasswordChange}
                    secureTextEntry

                />
                <TextInput
                    style={formStyles.input}
                    placeholder="Nouveau mot de passe"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry
                />
                <TextInput
                    style={formStyles.input}
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    secureTextEntry
                />
                <TouchableOpacity style={formStyles.button} onPress={handleCreateAccount}>
                    <Text style={formStyles.buttonText}>Enregistrer</Text>
                </TouchableOpacity>
           </View>
           
            
        </View>
    );
}

export default Password;
