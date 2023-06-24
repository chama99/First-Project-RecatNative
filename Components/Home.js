import React, { useEffect, useState } from 'react';
import { BackHandler, View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import homeStyles from '../styles/homeStyle';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Home = ({ route, navigation }) => {
    useEffect(() => {
        const blockBackButton = () => true;
        const backHandler = BackHandler.addEventListener('hardwareBackPress', blockBackButton);

        return () => {
            backHandler.remove();
        };
    }, []);

    const { user } = route.params;
    let ImageSource = require('../assets/prof.png');
    if (user.image.uri !== "require('../assets/prof.png')") {
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
                <Text>Contenu de la page de Accueil</Text>
            </View>
            
        ),
        profile: () => (
            
            <View style={homeStyles.container}>
                <View style={homeStyles.contentContainer}>
                    <Image source={ImageSource} style={homeStyles.profileImage} />
                    <Text style={homeStyles.greetingText}> {user.nom} {user.prenom}</Text>
              
                    <Text style={homeStyles.Text}>Email:{user.email}</Text>
                </View>
                <View style={homeStyles.Container}>
                    <TouchableOpacity style={homeStyles.editButton} onPress={goToProfil}>
                    <FontAwesome name="edit" style={homeStyles.editIcon} />
                    <Text style={homeStyles.editText}>Modifier le profil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={homeStyles.editButton} onPress={console.log('edit profil')}>
                    <FontAwesome name="edit" style={homeStyles.editIcon} />
                    <Text style={homeStyles.editText}>Changer mot de passe</Text>
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
        navigation.navigate('Profil', { user: user });
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
