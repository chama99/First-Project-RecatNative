import React, { useState, useMemo } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export async function AddPost(userId,desc, img, likes, comments) {
    try {
       
        const response = await axios.post('http://192.168.30.112:8080/addpost', {userId,desc, img, likes, comments });
        return Promise.resolve(response.data.mssg); // Renvoyer la réponse du serveur
    } catch (error) {
        return Promise.reject({ error });
    }
}
const CreatePost = ({route}) => {
    const [postText, setPostText] = useState('');
    const [postImages, setPostImages] = useState([]);
    const navigation = useNavigation();
    const user= route.params;
    // Utilisez useMemo pour calculer la désactivation du bouton en fonction des états du champ de texte et des images
    const isButtonDisabled = useMemo(() => {
        return postText.trim().length === 0 && postImages.length === 0;
    }, [postText, postImages]);

    const handlePost = async() => {
        const response = await AddPost(user.user, postText, postImages, [],[]);
        console.log('Server response:', user.user);
        // Logique pour poster le contenu
        console.log('Contenu de la publication:', postText);
        console.log('Images de la publication:', postImages);
        // Réinitialiser le champ de texte et les images après la publication
        setPostText('');
        setPostImages([]);
        navigation.goBack();
    };

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
        });
        try {
            if (!result.canceled) {
                const selectedImages = result.assets.map((asset) => (
                    asset.uri
                ));
                setPostImages([...postImages, ...selectedImages]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemoveImage = (index) => {
        const newPostImages = [...postImages];
        newPostImages.splice(index, 1);
        setPostImages(newPostImages);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/whitecape1.png')} style={styles.profilePicture} />
                <Text style={styles.title}>Chama haddad</Text>
            </View>
            <TextInput
                value={postText}
                onChangeText={setPostText}
                placeholder="Que voulez-vous partager ?"
                multiline
                style={styles.input}
            />
            <ScrollView horizontal>
                <View style={styles.imageContainer}>
                    {postImages.map((image, index) => (
                        <View key={index}>
                            <TouchableOpacity onPress={() => handleRemoveImage(index)} style={{ marginLeft: 170 }}>

                                <Entypo name="cross" size={24} color="black" />

                            </TouchableOpacity>
                            <Image source={{ uri: image.uri }} style={styles.selectedImage} />
                            
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity onPress={handleImagePicker} style={styles.button}>
                <Text style={styles.buttonText}>Ajouter des images</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handlePost}
                style={[styles.button, { opacity: isButtonDisabled ? 0.5 : 1 }]}
                disabled={isButtonDisabled}
            >
                <Text style={styles.buttonText}>Publier</Text>
            </TouchableOpacity>
        </ScrollView>
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
    imageContainer: {
        flexDirection: 'row',
    },
    selectedImage: {
        width: 200,
        height: 200,
        borderRadius: 8,
        marginRight: 16,
    },
    button: {
        backgroundColor: 'rgb(143, 71, 155)',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
        marginTop: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CreatePost;
