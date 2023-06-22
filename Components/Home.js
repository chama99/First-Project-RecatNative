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
    if (user.image.uri === "require('../assets/prof.png')"){
         ImageSource = require('../assets/prof.png');
    }else{
         ImageSource ={uri :user.image.uri}
    }
    return (
        <View>
            <Text>Bienvenue, {user.nom} {user.prenom} </Text>
            <Image
                source={ImageSource}
                style={{ width: 200, height: 200 }}
            />
        </View>
       
    );
};

export default Home;
