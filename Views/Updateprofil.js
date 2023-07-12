import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import appStyles from '../styles/appStyles';
import formStyles from '../styles/profilStyles';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export async function ModifierUser(id, nom, prenom, image) {
    try {
        const response = await axios.patch('http://192.168.137.66:80/UpdateUser', { id, nom, prenom, image });
        return Promise.resolve(response.data); // Renvoyer la réponse du serveur
    } catch (error) {
        return Promise.reject({ error });
    }
}

function UpdateProfil({ route, navigation }) {
    const { user, updateUserProfile } = route.params;

    let ImageSource = require('../assets/prof.png');
    if (user && user.image && user.image.uri !== "require('../assets/prof.png')") {
        ImageSource = { uri: user.image.uri };
    }

    const [name, setName] = useState(user.nom);
    const [prenom, setPrenom] = useState(user.prenom);
    const [email, setEmail] = useState(user.email);
    const [image, setSelectedImageSource] = useState(ImageSource);

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        try {
            if (!result.canceled) {
                setSelectedImageSource({ uri: result.assets[0].uri });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleNameChange = (text) => {
        setName(text);
    };

    const handlePrenomChange = (text) => {
        setPrenom(text);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handleCreateAccount = async () => {
        // Validation de base
        if (name === '') {
            Alert.alert('Erreur', "Veuillez entrer votre nom");
            return;
        }
        if (prenom === '') {
            Alert.alert('Erreur', "Veuillez entrer votre prénom");
            return;
        }
        if (email === '') {
            Alert.alert('Erreur', "Veuillez entrer votre e-mail");
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Erreur', "Veuillez entrer un e-mail valide (exemple@gmail.com)");
            return;
        }

        try {
            const response = await ModifierUser(user._id, name, prenom, image);
            console.log('Réponse du serveur:', response);
            // Appeler la fonction updateUserProfile passée depuis le composant Home
            updateUserProfile();

            // Revenir à l'écran Home
            navigation.goBack();
        } catch (error) {
            console.log('Erreur:', error);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <View style={appStyles.container}>
            <View>
                <Image source={image} style={formStyles.imgp} />
                <TouchableOpacity onPress={handleImagePicker} style={formStyles.iconContainer}>
                    <FontAwesome name="image" style={formStyles.icon} />
                </TouchableOpacity>

                <TextInput
                    style={formStyles.input}
                    placeholder="Nom"
                    value={name}
                    onChangeText={handleNameChange}
                />
                <TextInput
                    style={formStyles.input}
                    placeholder="Prénom"
                    value={prenom}
                    onChangeText={handlePrenomChange}
                />


                <TouchableOpacity style={formStyles.button} onPress={handleCreateAccount}>
                    <Text style={formStyles.buttonText}>Enregistrer</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

export default UpdateProfil;
