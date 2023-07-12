import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import {  Feather } from '@expo/vector-icons';
import styled from 'styled-components/native'

import {
    Ionicons,
    MaterialIcons,
    MaterialCommunityIcons
} from '@expo/vector-icons'



const Container = styled.View`
	width: 100%;
	height: 92px;
`
const Row = styled.View`
	flex-direction: row;
	background: #ffffff;
	width: 100%;
	padding: 0 11px;
	align-items: center;
`
const Input = styled.TextInput`
	height: 50px;
	width: 100%;
	padding: 0 8px;
`
const Divider = styled.View`
	width: 100%;
	height: 0.5px;
	background: #f0f0f0;
`
const Menu = styled.View`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 42px;
`
const MenuText = styled.Text`
	padding-left: 11px;
	font-weight: 500;
	font-size: 12px;
`
const Separator = styled.View`
	width: 1px;
	height: 26px;
	background: #f0f0f0;
`
const BottomDivider = styled.View`
	width: 100%;
	height: 9px;
	background: #f0f2f5;
`
const Accueil = ({ user, navigation }) => {
    const [searchValue, setSearchValue] = useState('');

    if (!user) {
        return null;
    }

    const { _id, image, nom, prenom } = user;

    const goToProfil = () => {
        navigation.navigate('Profil', { id: _id });
    };

    return (
        <View style={styles.container2}>
            <View style={styles.container}>
                <Text style={styles.textl}>𝔀𝓱𝓲𝓽𝓮𝓬𝓪𝓹𝓮 𝓼𝓸𝓬𝓲𝓪𝓵</Text>

                <TouchableOpacity onPress={goToProfil}>
                    {image && <Image source={image} style={styles.profileImage} />}
                </TouchableOpacity>
            </View>
            <ScrollView >
               
                <View style={styles.container}>
                    <Container>
                        <Row>
                            <TouchableOpacity style={styles.touchableOpacity}>
                             <Text>Créer une publication</Text>
                            </TouchableOpacity>
                            
                        </Row>
                        <Divider />
                        <Row>
                            <Menu>
                                <Ionicons name='ios-videocam' size={22} color='#F44337' />
                                <MenuText>Live</MenuText>
                            </Menu>
                            <Separator />

                            <Menu>
                                <MaterialIcons
                                    name='photo-size-select-actual'
                                    size={20}
                                    color='#4CAF50'
                                />
                                <MenuText>Photo</MenuText>
                            </Menu>
                            <Separator />

                            <Menu>
                                <MaterialCommunityIcons
                                    name='video-plus'
                                    size={22}
                                    color='#E141FC'
                                />
                                <MenuText>Room</MenuText>
                            </Menu>
                        </Row>
                    </Container>
                </View>
                <View style={styles.container1}>
                    <View style={styles.container3}>
                        {image && <Image source={image} style={styles.Image} />}
                        <Text style={styles.text}>Nom du poste</Text>
                        <Feather name="more-horizontal" style={styles.Icon2} />
                    </View>
                </View>
                <View style={styles.container1}>
                    <View style={styles.container3}>
                        {image && <Image source={image} style={styles.Image} />}
                        <Text style={styles.text}>Nom du poste</Text>
                        <Feather name="more-horizontal" style={styles.Icon2} />
                    </View>
                </View>
                <View style={styles.container1}>
                    <View style={styles.container3}>
                        {image && <Image source={image} style={styles.Image} />}
                        <Text style={styles.text}>Nom du poste</Text>
                        <Feather name="more-horizontal" style={styles.Icon2} />
                    </View>
                </View>
                <View style={styles.container1}>
                    <View style={styles.container3}>
                        {image && <Image source={image} style={styles.Image} />}
                        <Text style={styles.text}>Nom du poste</Text>
                        <Feather name="more-horizontal" style={styles.Icon2} />
                    </View>
                </View>
                <View style={styles.container1}>
                    <View style={styles.container3}>
                        {image && <Image source={image} style={styles.Image} />}
                        <Text style={styles.text}>Nom du poste</Text>
                        <Feather name="more-horizontal" style={styles.Icon2} />
                    </View>
                </View>
                <View style={styles.container1}>
                    <View style={styles.container3}>
                        {image && <Image source={image} style={styles.Image} />}
                        <Text style={styles.text}>Nom du poste</Text>
                        <Feather name="more-horizontal" style={styles.Icon2} />
                    </View>
                </View>
                <View style={styles.container1}>
                    <View style={styles.container3}>
                        {image && <Image source={image} style={styles.Image} />}
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
        padding: 16,
        backgroundColor: 'white',
        marginBottom: 10     
    },
    container1: {
        padding: 16,
        backgroundColor: 'white',
        marginBottom:10
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
        marginTop: 20,
        marginLeft: 120,
    },
   Image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 16,
        marginTop: 20,
        
    },
    searchContainer: {
     
        marginTop: 30,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 25,
        paddingHorizontal: 6,
        paddingVertical: 5,
        backgroundColor: 'white',
        width: 200,
    },
    iconContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginTop: 30,
    },
    Icon: {
        fontSize: 25,
        color: 'black',
        backgroundColor: '#DCD9DD',
        borderRadius: 25,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        paddingTop: 0,
        paddingLeft: 4,
    },
    Icon2: {
        fontSize: 25,
        color: 'black',
        marginBottom: 16,
        marginTop: 25,
        paddingLeft: 180,
    },
    textl: {
        fontSize:30,
        alignSelf: 'center',
        marginTop: 10,
    },
   touchableOpacity: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
       borderColor:'#3498db'
  
  },
  
  textp: {
    color: '#fff',
    fontsize: 16,
    fontweight: 'bold'
},
  
    text: {
        fontSize: 10,
        marginTop: 30,
        marginLeft: 30,
        fontWeight: 'bold',
    },

    button: {
        height: 30,


        borderRadius: 20,

       
        backgroundColor: 'rgb(143, 71, 155)', // Couleur de bordure par défaut
        marginBottom: 0
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
});

export default Accueil;
