import React, { useEffect, useState } from 'react';
import { BackHandler, View, Text, Image, StyleSheet, Alert } from 'react-native';
import {  BottomNavigation } from 'react-native-paper';

import homeStyles from '../styles/homeStyle';

import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Accueil from './Accueil';

const fetchUser = async (id) => {
    try {
        const response = await axios.get(`http://192.168.30.112:8080/getById/${id}`);
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
        { key: 'messages', title: 'Messages', icon: 'account' },
        { key: 'rechercher', title: 'Rechercher', icon: 'rechercher' },
        { key: 'notifications', title: 'Notifications', icon: 'notifications' },
        
       
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: () => (
            <Accueil user={user} navigation={navigation}  />

        ),
       messages: () => (
           <View style={homeStyles.contentContainer}>
               <Text>Messages</Text>
            </View>
        ),
        rechercher: () => (
            <View style={homeStyles.contentContainer}>
                <Text>Rechercher</Text>
                
            </View>
        ),
        notifications: () => (
            <View style={homeStyles.contentContainer}>
                <Text>Notifications</Text>

            </View>
        ),
    });

    const handleIndexChange = (newIndex) => {
       
            setIndex(newIndex);
        
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
            case 'messages':
                iconName = 'ios-chatbubble-ellipses-sharp';
                break;
            case 'rechercher':
                iconName = 'search';
                break;
            case 'notifications':
                iconName = 'notifications';
                break;
           
            default:
                iconName = 'home';
        }
        const iconColor = focused ? 'rgb(143, 71, 155)' : color; // Définir la couleur de l'icône en fonction de son état
        return <Ionicons name={iconName} size={24} color={iconColor} />;
    };

    const goToProfil = () => {
        navigation.navigate('UpdateProfil', { user: user, updateUserProfile: updateUserProfile });
    };
    const goToPassword = () => {
        navigation.navigate('Password', { user: user });
    };
    return (
        <View style={homeStyles.container}>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={handleIndexChange}
                renderScene={renderScene}
                renderIcon={renderIcon}
                barStyle={homeStyles.bottomNavigation}
            />
        </View>
    );
};

export default Home;