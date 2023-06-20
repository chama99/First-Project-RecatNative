import React, { useState ,useRef} from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import appStyles from '../styles/appStyles';
import formStyles from '../styles/formStyles';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import axios from 'axios';
/** register user function */
export async function registerUser(nom, email, password) {
    try {
        const response = await axios.post('http://192.168.56.1:6000/register', { nom, email, password });
        return Promise.resolve(response.data.mssg); // Renvoyer la réponse du serveur
    } catch (error) {
        return Promise.reject({ error });
    }
}



function Compte() {
    const [name, setName] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const defaultImageSource = require('../assets/prof.png');
    const [selectedImageSource, setSelectedImageSource] = useState(defaultImageSource);
    const [capturedImage, setCapturedImage] = useState(null);
    const cameraRef = useRef(null);
    const handleCameraCapture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setCapturedImage(photo.uri);
        }
    };

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
          
            setSelectedImageSource({ uri: result.uri });
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

        // If all validations pass, create the account
        console.log('Account created:', {
            name,
            prenom,
            email,
            password,
            selectedImageSource
        });
        try {
            const response = await registerUser(name, email, password);
            console.log('Server response:', response);
            
        } catch (error) {
            console.log('Error:', error);
        }
        
        // Reset field values
        setName('');
        setPrenom('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setSelectedImageSource(defaultImageSource)
        
    };

    const validateEmail = (email) => {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <View style={appStyles.container}>
            <Image source={selectedImageSource} style={formStyles.imgp} />
            <TouchableOpacity onPress={handleImagePicker} style={formStyles.iconContainer}>
                <FontAwesome name="image" style={formStyles.icon} />
            </TouchableOpacity>
            <Camera style={formStyles.camera} ref={cameraRef} />

           

            <TouchableOpacity onPress={handleCameraCapture}>
                <Text>Capturer une photo</Text>
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
