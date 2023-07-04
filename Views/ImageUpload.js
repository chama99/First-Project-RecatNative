import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const selectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission refusée pour accéder à la galerie');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };

    const handleImageUpload = async () => {
        if (!selectedImage) {
            console.log('Aucune image sélectionnée');
            return;
        }

        const formData = new FormData();
        formData.append('image', {
            uri: selectedImage,
            type: 'image/jpeg',
            name: 'image.jpg',
        });

        try {
            const response = await axios.post('http://192.168.1.16:6000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Réponse du serveur:', response.data);
        } catch (error) {
            console.log('Erreur lors de l\'envoi de l\'image:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Sélectionnez une image à télécharger :</Text>
            <Button title="Sélectionner une image" onPress={selectImage} />

            {selectedImage && (
                <View>
                    <Text>Image sélectionnée :</Text>
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                </View>
            )}

            <Button title="Télécharger l'image" onPress={handleImageUpload} disabled={!selectedImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default ImageUpload;
