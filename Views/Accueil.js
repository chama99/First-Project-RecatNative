import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

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
                <Ionicons name="add-outline" style={styles.Icon} />
                <Ionicons name="notifications-outline" style={styles.Icon} />
                </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container1}>
                    <View style={styles.container3}>

                      {image && <Image source={image} style={styles.profileImage} />}

                        <Text style={styles.text}>Nom du poste</Text>
                        <Feather name="more-horizontal" style={styles.Icon2} />
                        
                    </View>
                </View>
            </ScrollView>
           
            
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding:16,
        backgroundColor: 'white',
    },
    container1: {
        padding:16,
        backgroundColor: 'white',
    },
    container2: {
        flex: 1,
        backgroundColor: '#DCD9DD',
    },
    container3: {
        flexDirection: 'row',
       
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
        marginTop: 25,
       
        
        
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 25,
        paddingHorizontal: 6,
        paddingVertical: 5,
        backgroundColor: 'white',
        width: 230, 
       
    },
    Icon:{
         fontSize: 25,
         color:"black",
         marginBottom: 16,
         marginTop: 30,
        marginRight: 2,
    },
    Icon2: {
        fontSize: 25,
        color: "black",
        marginBottom: 16,
        marginTop: 25,
        paddingLeft: 180,
    },
    image: {
        marginTop: 30,
        height:100, // Utilisation de 30% de la hauteur de l'écran comme hauteur de l'image
        width:200,
        alignSelf:'center' // Utilisation de 90% de la largeur de l'écran comme largeur de l'image

    },
    scrollView: {
       
        
        marginTop:10
    },
    text: {
        fontSize: 10,
        marginTop: 30,
        marginLeft: 30,
        fontWeight: 'bold',
    },
});

export default Accueil;
