import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import appStyles from '../styles/appStyles';
import formStyles from '../styles/formStyles';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export async function registerUser(nom, prenom, email, password, image) {
    try {
        if (typeof image === 'number') {
            image = { uri: "require('../assets/prof.png')" };
        }

        const response = await axios.post('http://192.168.1.16:6000/register', { nom, prenom, email, password, image: image });
        return Promise.resolve(response.data.mssg); // Renvoyer la réponse du serveur
    } catch (error) {
        return Promise.reject({ error });
    }
}



function Profil({ route }) {
    const { user } = route.params;
    let ImageSource = require('../assets/prof.png');
    if (user.image.uri !== "require('../assets/prof.png')") {
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
            console.log(err)
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

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
    };

    const handleCreateAccount = async () => {
        // Basic validation
        if (name === '') {
            Alert.alert('Erreur', "S'il vous plaît entrez votre nom");
            return;
        }
        if (prenom === '') {
            Alert.alert('Erreur', "S'il vous plaît entrez votre prénom");
            return;
        }

        if (email === '') {
            Alert.alert('Erreur', "S'il vous plaît entrez votre email");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Erreur', "Veuillez entrer un email valide (exemple@gmail.com)");
            return;
        }

        if (password === '') {
            Alert.alert('Erreur', "S'il vous plaît entrez votre mot de passe");
            return;
        }

        if (confirmPassword === '') {
            Alert.alert('Erreur', "Veuillez confirmer votre mot de passe");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
            return;
        }
        if (!validatePassword(password)) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins un symbole, une lettre majuscule et avoir une longueur minimale de 8 caractères');
            return;
        }

        console.log('Account created:', {
            name,
            prenom,
            email,
            password,
            image
        });
        try {
            const response = await registerUser(name, prenom, email, password, image);
            console.log('Server response:', response);
            if (response === "Cet email existe déja") {
                Alert.alert('Erreur', response)
            } else {
                Alert.alert('Succès', 'Compte créé avec succès.')
                setName('');
                setPrenom('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setSelectedImageSource(defaultImageSource)
            }

        } catch (error) {
            console.log('Error:', error);
        }




    };

    const validateEmail = (email) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password) => {

        const symbolRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
        const uppercaseRegex = /[A-Z]/;
        return symbolRegex.test(password) && uppercaseRegex.test(password) && password.length >= 8;
    };
    return (
        <View style={appStyles.container}>
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
            <TextInput
                style={formStyles.input}
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
            />
           
            <TouchableOpacity style={formStyles.button} onPress={handleCreateAccount}>
                <Text style={formStyles.buttonText}>Modifier</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Profil;
