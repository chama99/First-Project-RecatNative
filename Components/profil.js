import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import appStyles from '../styles/appStyles';
import formStyles from '../styles/formStyles';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


export async function ModifierUser(id,nom,prenom,email,image) {
    try {
       

        const response = await axios.patch('http://192.168.1.16:6000/UpdateUser', {id, nom, prenom, email,  image });
        return Promise.resolve(response.data); // Renvoyer la réponse du serveur
    } catch (error) {
        return Promise.reject({ error });
    }
}



function Profil({ route, navigation }) {
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

       
       

      
        try {
            const response = await ModifierUser(user._id,name, prenom, email,  image);
            console.log('Server response:', response);
            // Appeler la fonction updateUserProfile passée depuis le composant Home
            updateUserProfile();

            // Revenir à l'écran Home
            navigation.goBack();
              
                } catch (error) {
            console.log('Error:', error);
        }




    };

    const validateEmail = (email) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
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
