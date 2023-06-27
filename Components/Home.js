import React, { useEffect, useState } from 'react';
import { BackHandler, View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import homeStyles from '../styles/homeStyle';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const fetchUser = async (id) => {
    try {
        const response = await axios.get(`http://192.168.1.16:80/getById/${id}`);
        console.log(response.data);
        return response.data.user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const Home = ({ route, navigation }) => {
    const { id } = route.params;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const blockBackButton = () => true;
        const backHandler = BackHandler.addEventListener('hardwareBackPress', blockBackButton);

        return () => {
            backHandler.remove();
        };
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await fetchUser(id);
            setUser(userData);
        };

        fetchUserData();
      
    }, [id]);
    const updateUserProfile = async () => {
        const updatedUserData = await fetchUser(id);
        setUser(updatedUserData);
    };
    

    let ImageSource = require('../assets/prof.png');
    if (user && user.image && user.image.uri !== "require('../assets/prof.png')") {
        ImageSource = { uri: user.image.uri };
    }



   
  
 

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'home', title: 'Accueil', icon: 'home' },
        { key: 'profile', title: 'Profil', icon: 'account' },
        { key: 'logout', title: 'Déconnexion', icon: 'logout' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: () => (
            <View style={homeStyles.contentContainer}>
                <Text>Contenu de la page d'accueil</Text>
            </View>
        ),
        profile: () => (
            <View style={homeStyles.container}>
                <View style={homeStyles.contentContainer}>
                     <Image source={ImageSource} style={homeStyles.profileImage} />
                    <Text style={homeStyles.greetingText}>{user ? `${user.nom} ${user.prenom}` : ''}</Text>
                    <Text style={homeStyles.Text}>Email: {user ? user.email : ''}</Text>
                </View>
                <View style={homeStyles.Container}>
                    <TouchableOpacity style={homeStyles.editButton} onPress={goToProfil}>
                        <FontAwesome name="edit" style={homeStyles.editIcon} />
                        <Text style={homeStyles.editText}>Modifier le profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={homeStyles.editButton} onPress={() => console.log(ImageSource)}>
                        <FontAwesome name="edit" style={homeStyles.editIcon} />
                        <Text style={homeStyles.editText}>Changer le mot de passe</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ),
        logout: () => (
            <View style={homeStyles.contentContainer}>
                <Text>Êtes-vous sûr de vouloir vous déconnecter ?</Text>
                <Text>Appuyez sur le bouton "Déconnexion" pour confirmer.</Text>
            </View>
        ),
    });

    const handleIndexChange = (newIndex) => {
        if (newIndex === 2) {
            showLogoutConfirmation();
        } else {
            setIndex(newIndex);
        }
    };

    const showLogoutConfirmation = () => {
        Alert.alert(
            'Confirmation de déconnexion',
            'Êtes-vous sûr de vouloir vous déconnecter ?',
            [
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
                {
                    text: 'Déconnexion',
                    onPress: () => {
                        navigation.navigate('Deconnexion');
                    },
                },
            ]
        );
    };

    const renderIcon = ({ route, color, focused }) => {
        let iconName;

        switch (route.key) {
            case 'home':
                iconName = 'home';
                break;
            case 'profile':
                iconName = 'account';
                break;
            case 'logout':
                iconName = 'logout';
                break;
            default:
                iconName = 'home';
        }

        return <Icon name={iconName} size={24} color={color} />;
    };

    const goToProfil = () => {
        navigation.navigate('Profil', { user: user,updateUserProfile: updateUserProfile });
    };

    return (
        <View style={homeStyles.container}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={handleIndexChange}
                renderScene={renderScene}
                renderIcon={renderIcon}
            />
        </View>
    );
};

export default Home;
