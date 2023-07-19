import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const CreatePost = () => {
    const [postText, setPostText] = useState('');
    const [postImages, setPostImages] = useState([]);

    const handlePost = () => {
        // Logique pour poster le contenu
        console.log('Contenu de la publication:', postText);
        console.log('Images de la publication:', postImages);
        // Réinitialiser le champ de texte et les images après la publication
        setPostText('');
        setPostImages([]);
    };

    const handleImagePicker = () => {
        ImagePicker.showImagePicker({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error) {
                const selectedImage = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName || 'image.jpg',
                };
                setPostImages([...postImages, selectedImage]);
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/whitecape1.png') } style={styles.profilePicture} />
                <Text style={styles.title}>Chama haddad</Text>
            </View>
            <TextInput
                value={postText}
                onChangeText={setPostText}
                placeholder="Que voulez-vous partager ?"
                multiline
                style={styles.input}
            />
            {postImages.map((image, index) => (
                <Image key={index} source={{ uri: image.uri }} style={styles.selectedImage} />
            ))}
            <TouchableOpacity onPress={handleImagePicker} style={styles.button}>
                <Text style={styles.buttonText}>Ajouter une image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePost} style={styles.button}>
                <Text style={styles.buttonText}>Publier</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        height: 120,
        textAlignVertical: 'top',
    },
    selectedImage: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#4267B2',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CreatePost;
