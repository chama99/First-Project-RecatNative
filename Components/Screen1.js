import React from 'react';
import { View, Text, Button } from 'react-native';
import Compte from './Compte'

const Screen1 = ({ navigation }) => {
    const goToCreateAccount = () => {
        navigation.navigate('Compte');
    };

    return (
        <View>
            <Text>Screen 1</Text>
            <Button title="Créer un compte" onPress={goToCreateAccount} />
        </View>
    );
};

export default Screen1;
