import React from 'react';
import { View, Text, Button, Alert,Image } from 'react-native';
import axios from 'axios';
import appStyles from '../styles/appStyles';
import formStyles from '../styles/formStyles';
import FastImage from 'react-native-fast-image';

const Home = ({ route }) => {
    const goToCreateAccount = () => {
        navigation.navigate('Compte');
    };
    const { user } = route.params;
   
    return (
        <View>
            <Text>Bienvenue, {user.nom} {user.prenom}</Text>
            <Image ssource={{ uri: user.image.uri }}  />
        </View>
       
    );
};

export default Home;
