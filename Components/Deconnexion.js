import React, { useEffect } from 'react';
import { BackHandler, View, Text, Image, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const Deconnexion = ({ navigation }) => {
    useEffect(() => {
        const blockBackButton = () => true;
        const backHandler = BackHandler.addEventListener('hardwareBackPress', blockBackButton);

        // Redirection vers la page de connexion après 3 secondes
        const redirectTimeout = setTimeout(() => {
            navigation.navigate('Connexion');
        }, 3000);

        return () => {
            backHandler.remove();
            clearTimeout(redirectTimeout);
        };
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={styles.loadingText}>Déconnexion en cours...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: 20,
        fontSize: 16,
    },
});

export default Deconnexion;
