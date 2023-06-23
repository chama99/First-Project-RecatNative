import React, { useEffect, useState } from 'react';
import { BackHandler, View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Appbar, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
            <View style={styles.contentContainer}>
                <Text style={styles.greetingText}>Bienvenue, {user.nom} {user.prenom}</Text>
                <Image source={ImageSource} style={styles.profileImage} />
            </View>
        ),
        profile: () => (
            <View style={styles.contentContainer}>
                <Text>Contenu de la page de profil</Text>
            </View>
        ),
        logout: () => (
            <View style={styles.contentContainer}>
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

    return (
        <View style={styles.container}>
            
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={handleIndexChange}
                renderScene={renderScene}
                renderIcon={renderIcon}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    appbar: {
        backgroundColor: '#fff',
        elevation: 0,
    },
    appbarTitle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
});

export default Home;
