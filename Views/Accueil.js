import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native';

import Modal from 'react-native-modal';

import {
    Ionicons,
    MaterialIcons,
    FontAwesome,
    Feather, AntDesign,

} from '@expo/vector-icons'

const Accueil = ({ user, navigation }) => {
    const [searchValue, setSearchValue] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [NbrLike, setNbrLike] = useState(22);

    const handleLike = () => {
        setLiked(!liked);
        if (liked != false) {
            setNbrLike(NbrLike - 1);
        } else {
            setNbrLike(NbrLike + 1);
        }
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const sendComment = () => {
        if (comment !== '') {
            setComments([...comments, comment]);
            setComment('');
        }
    };

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
            <ScrollView>
                <View style={styles.container1}>
                    <TouchableOpacity style={styles.pub}>
                        <Text>Créer une publication</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <View style={styles.container3}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name='ios-videocam' size={22} color='#F44337' />
                            <Text>Live</Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons
                                name='photo-size-select-actual'
                                size={20}
                                color='#4CAF50'
                            />
                            <Text>Photo</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container1}>
                    <View style={styles.container3}>
                        {image && <Image source={image} style={styles.Image} />}
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.text}>{nom} {prenom}</Text>
                            <Text style={styles.text}>9mm</Text>
                        </View>
                        <Feather name="more-horizontal" style={styles.Icon2} />
                    </View>
                    {image && <Image source={require('../assets/whitecape1.png')} />}
                    <View style={styles.container3}>
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name="like2" size={24} color="black" />
                            <Text style={{ paddingLeft: 10, paddingTop: 5 }}>{NbrLike}</Text>
                        </View>
                        <Text>9 commentaires</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.container3}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row' }}
                            onPress={handleLike}
                        >
                            <AntDesign name={liked ? 'like1' : 'like2'} size={24} color={liked ? 'rgb(143, 71, 155)' : 'black'} />
                            <Text style={{ paddingLeft: 10, paddingTop: 5, color: liked ? 'rgb(143, 71, 155)' : 'black' }}>
                                J'aime
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={togglePopup}>
                            <FontAwesome name="comment-o" size={24} color="black" />
                            <Text style={{ paddingLeft: 10, paddingTop: 5 }}>Commenter</Text>
                        </TouchableOpacity>
                        <Modal
                            isVisible={showPopup}
                            backdropOpacity={0.5}
                            onBackdropPress={togglePopup}
                            style={{ margin: 0, justifyContent: 'flex-end' }}
                        >
                            <View style={{ backgroundColor: 'white', padding: 20 }}>
                                {/* Liste des commentaires */}
                                <FlatList
                                    data={comments}
                                    renderItem={({ item }) => (
                                        <Text>{item}</Text>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                <TouchableOpacity style={styles.pub}>
                                    <TextInput
                                        value={comment}
                                        onChangeText={text => setComment(text)}
                                        placeholder="Écrire un commentaire..."
                                       
                                    />
                                    <TouchableOpacity onPress={sendComment}>
                                        <Ionicons name="send-outline" size={24} color="black" />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                               
                                
                                <TouchableOpacity onPress={togglePopup} style={{ marginTop: 10 }}>
                                    <Text>Fermer</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
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
        marginBottom: 10
    },
    container2: {
        flex: 1,
        backgroundColor: '#DCD9DD',
    },
    container3: {
        justifyContent: 'space-between',
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
        marginTop: 10,
    },
    searchContainer: {
        marginTop: 10,
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
        paddingLeft: 200,
    },
    textl: {
        fontSize: 30,
        alignSelf: 'center',
        marginTop: 10,
        color: 'rgb(143, 71, 155)'
    },
    pub: {
        backgroundColor: '#F2F3F5',
        padding: 10,
        borderRadius: 50,
        borderColor: '#F2F3F5',
        borderWidth: 1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    textp: {
        color: '#fff',
        fontsize: 16,
        fontweight: 'bold'
    },
    text: {
        fontSize: 10,
        marginTop: 10,
        marginLeft: 10,
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
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#DCDCDC',
        marginBottom: 10,
        marginTop: 10,
    },
    separator: {
        width: 1,
        height: 26,
        backgroundColor: '#DCDCDC',
    }
});

export default Accueil;
