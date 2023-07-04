import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import appStyles from '../styles/appStyles';

const Accueil = ({ user }) => {
    const [searchValue, setSearchValue] = useState('');

    if (!user) {
        return null;
    }

    const { image, nom, prenom } = user;

    return (
        <View style={styles.container2}>
            <View style={styles.container}>
                {image && <Image source={image} style={styles.profileImage} />}
                
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Recherche..."
                        value={searchValue}
                        onChangeText={setSearchValue}
                    />
                </View>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
       
        padding: 16,
        backgroundColor: '#D8BFD8',
    },
    container2: {
        flex: 1,
        backgroundColor: 'white',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 16,
        marginTop:20
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchContainer: {
        paddingHorizontal: 16,
        marginBottom: 16,
        paddingLeft:80
        
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 25,
        paddingHorizontal: 6,
        paddingVertical: 5,
    },
});

export default Accueil;
