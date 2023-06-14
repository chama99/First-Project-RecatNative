import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';
import appStyles from '../styles/appStyles';
import formStyles from '../styles/formStyles';
import * as ImagePicker from 'expo-image-picker';

function Compte() {
    const [name, setName] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

  

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            console.log('Image sélectionnée:', result.uri);
            setSelectedImage(result.uri);
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

    const handleCreateAccount = () => {
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

        // If all validations pass, create the account
        console.log('Account created:', {
            name,
            prenom,
            email,
            password,
        });
        // Reset field values
        setName('');
        setPrenom('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSelectedImage(null);
    };

    const validateEmail = (email) => {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <View style={appStyles.container}>
            <TouchableOpacity style={formStyles.button} onPress={handleImagePicker}>
                <Text style={formStyles.buttonText}>Image</Text>
            </TouchableOpacity>
            {selectedImage && <Image source={{ uri: selectedImage }} style={formStyles.image} />}
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
            <TextInput
                style={formStyles.input}
                placeholder="Mot de passe"
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
                <Text style={formStyles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Compte;
