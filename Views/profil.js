import { Alert, BackHandler, View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, RefreshControl } from 'react-native'
import React ,{ useState,useEffect } from 'react'

import defaultImage from '../assets/prof.png';
import axios from 'axios';
import Modal from 'react-native-modal';

import {
    Ionicons,
    MaterialIcons,
    FontAwesome,
    AntDesign,
    
} from '@expo/vector-icons';
const fetchUser = async (id) => {
    try {
        const response = await axios.get(`http://192.168.30.112:8080/getById/${id}`);
        console.log(response.data);
        return response.data.user;
    } catch (error) {
        console.log(error);
        return null;
    }
};
function Profil ({ route, navigation})  {
    const { id } = route.params;
    const [user, setUser] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [liked, setLiked] = useState(false);
    const [NbrLike, setNbrLike] = useState(22);
    const [NbrComment, setNbrComment] = useState(0);
    const [sendcomment, setSendComment] = useState(false);
   
    const [showOptions, setShowOptions] = useState(false);
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // Mettez ici votre logique pour actualiser les données (par exemple, rappeler fetchPosts())
        fetchPosts(id)
        // Une fois l'actualisation terminée, définissez refreshing sur false pour arrêter l'indicateur de chargement.
        setRefreshing(false);
    };
    const fetchPosts = async (id) => {
        try {
            const response = await axios.get(`http://192.168.30.112:8080/getPostById/${id}`);
            setPosts(response.data.posts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPosts(id);
    }, []);
    const handleMoreOptions = () => {
        setShowOptions(!showOptions); // Inverser la valeur de showOptions pour afficher ou masquer le contenu bloqué
    };
   
    useEffect(() => {
        const blockBackButton = () => true;
        const backHandler = BackHandler.addEventListener('hardwareBackPress', blockBackButton);

        return () => {
            backHandler.remove();
        };
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await fetchUser(id);
            setUser(userData);
        };

        fetchUserData();

    }, [id]);
    const updateUserProfile = async () => {
        const updatedUserData = await fetchUser(id);
        setUser(updatedUserData);
    };

    const firstName = user?.nom || '';
    const lastName = user?.prenom || '';

    const email = user?.email || '';
    let ImageSource = require('../assets/prof.png');
    if (user && user.image && user.image.uri !== "require('../assets/prof.png')") {
        ImageSource = { uri: user.image.uri };
    }
    const goToProfil = () => {
        navigation.navigate('UpdateProfil', { user: user, updateUserProfile: updateUserProfile });
    };
    const goToPassword = () => {
        navigation.navigate('Password', { user: user });
    };
    
    const handleLike = () => {
        setLiked(!liked);
        setNbrLike((prevNbrLike) => (liked ? prevNbrLike - 1 : prevNbrLike + 1));
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
        setSendComment(false);
    };

    const sendComment = () => {
        if (comment !== '') {
            setComments((prevComments) => [...prevComments, comment]);
            setSendComment(true);
            setComment('');
            setNbrComment(NbrComment + 1)
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
  
    const goToPost = () => {
        navigation.navigate('CreatePost');
    };
    return (
        <View style={styles.container2}>
            
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <Image source={ImageSource} style={styles.profileImage} />
                    <View style={{flexDirection:'column'}}>
                        <Text style={styles.textl}> {lastName} {firstName}</Text>
                        <Text style={styles.textee}>{email}</Text>
                    </View>

                </View>
                <View styles={{ flexDirection: 'column' }}>
                    
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.pube} onPress={goToProfil}>
                            <MaterialIcons name="edit" style={styles.editIcon} />
                            <Text style={styles.texte}>Modifier le profil</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.pube} onPress={goToPassword}>
                            <MaterialIcons name="edit" style={styles.editIcon} />
                            <Text style={styles.texte}>Changer le mot de passe</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.container1}>
                    <TouchableOpacity style={styles.pub} onPress={goToPost}>
                        <Text>Créer une publication</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <View style={[styles.container3, { flexDirection: "row" }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.pub} >
                                <Ionicons name="ios-videocam" size={22} color="#F44337" />
                                <Text>Live</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.separator} />
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.pub} onPress={goToPost}>
                                <MaterialIcons name="photo-size-select-actual" size={20} color="#4CAF50" />
                                <Text>Photo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {
                    posts.map((post) => (
                        <View key={post._id}>
                            <View style={styles.container1}>
                                <View style={styles.container3}>

                                    <View style={{ flexDirection: 'row' }}>
                                        <Image source={post.userId.image.uri == "require('../assets/prof.png')" ? defaultImage : { uri: post.userId.image.uri }} style={styles.Image} />

                                        <View style={{ flexDirection: 'column' }}>
                                            <Text style={styles.text}> {post.userId.prenom} {post.userId.nom}</Text>
                                            <Text style={styles.text}>9mm</Text>
                                        </View>


                                    </View>
                                    <Text style={styles.textdes}>{post.desc} {post.desc}</Text>

                                </View>
                                <ScrollView horizontal>
                                    <View style={styles.imageContainer}>
                                        {post.img.map((image, index) => {
                                            console.log("Image URL:", image); // Vérifiez le contenu des URLs ici
                                            return (
                                                <View key={index}>
                                                    <Image source={{ uri: image }} style={styles.selectedImage} />
                                                </View>
                                            );
                                        })}
                                    </View>
                                </ScrollView>


                                <View style={[styles.container3, { flexDirection: "row" }]}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <AntDesign name="like2" size={24} color="black" />
                                        <Text style={{ paddingLeft: 10, paddingTop: 5 }}>{NbrLike}</Text>
                                    </View>
                                    <Text>{NbrComment} commentaires</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={[styles.container3, { flexDirection: "row" }]}>
                                    <TouchableOpacity style={{ flexDirection: 'row' }} onPress={handleLike}>
                                        <AntDesign
                                            name={liked ? 'like1' : 'like2'}
                                            size={24}
                                            color={liked ? 'rgb(143, 71, 155)' : 'black'}
                                        />
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
                                        style={{ marginTop: 20, margin: 0, justifyContent: 'flex-end' }}
                                    >
                                        <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
                                            <TouchableOpacity onPress={togglePopup} style={{ alignSelf: 'flex-end' }}>
                                                <AntDesign name="close" size={24} color="black" />
                                            </TouchableOpacity>
                                            <ScrollView>
                                                {comments.map((item, index) => (
                                                    <View style={{ flexDirection: 'row' }} >
                                                        {user.image && <Image source={user.image} style={styles.Image} />}
                                                        <View style={styles.comment}>
                                                            <Text style={styles.textcomment}>{user.nom} {user.prenom}</Text>
                                                            <Text >{item}</Text>
                                                        </View>
                                                    </View>
                                                ))}



                                            </ScrollView>
                                            <View style={styles.commentInputContainer}>
                                                <TextInput
                                                    value={comment}
                                                    onChangeText={text => setComment(text)}
                                                    placeholder="Écrire un commentaire..."
                                                    style={styles.commentInput}
                                                />
                                                <TouchableOpacity onPress={sendComment}>
                                                    <Ionicons
                                                        name={sendcomment ? 'send' : 'send-outline'}
                                                        size={24}
                                                        style={{ color: sendcomment ? 'rgb(143, 71, 155)' : 'black' }}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                </View>
                            </View>
                        </View>
                    )).reverse()
                }
            </ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.pube, { alignItems: 'center', justifyContent: 'center', }]} onPress={showLogoutConfirmation}>
                    
                    <Text style={styles.textd}>Se déconnecter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        padding: 16,
        backgroundColor: 'white',
      
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
        flexDirection: 'column',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
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
        fontSize: 20,
        alignSelf: 'flex-start',
        fontWeight:'bold',
        color: 'black',
        margin:15
    },
    texte: {
        fontSize: 14,
        alignSelf: 'flex-start',
        fontWeight: 'bold',
    },
    textd: {
        fontSize: 14,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    textee: {
        fontSize: 16,
        alignSelf: 'flex-start',
        
    },
    pub: {
        backgroundColor: '#F2F3F5',
        padding: 10,
        borderRadius: 50,
        borderColor: '#F2F3F5',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    pube: {
        backgroundColor: '#F2F3F5',
        padding: 10,
        borderRadius: 10,
        borderColor: '#F2F3F5',
        borderWidth: 1,
        flexDirection:'row',
        marginRight:2
    },
    comment: {
        backgroundColor: '#F2F3F5',
        padding: 10,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 20,
        borderColor: '#F2F3F5',
        borderWidth: 2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flexShrink: 1
    },


    commentContent: {
        marginLeft: 10,
        flexDirection: 'column'
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#F2F3F5',
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#F2F3F5',
        marginRight: 10
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
    textcomment: {
        fontSize: 10,

        fontWeight: 'bold',
    },
    button: {
        height: 30,
        borderRadius: 20,
        backgroundColor: 'rgb(143, 71, 155)',
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
    },
    editIcon: {
        fontSize: 20,
       
        color: 'black',
    },
    optionsContainer: {
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    optionItem: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    optionText: {
        fontSize: 16,
        color: 'black',
    },
    imageContainer: {
        flexDirection: 'row',
    },
    selectedImage: {
        width: 400,
        height: 400,


    },

});

export default Profil ;