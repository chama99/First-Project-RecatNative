import { BackHandler,View, Text, TouchableOpacity ,Image} from 'react-native'
import React ,{ useState,useEffect } from 'react'
import homeStyles from '../styles/homeStyle';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
const fetchUser = async (id) => {
    try {
        const response = await axios.get(`http://192.168.1.16:80/getById/${id}`);
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
  return (
      <View style={homeStyles.container}>
          <View style={homeStyles.contentContainer}>
              <Image source={ImageSource} style={homeStyles.profileImage} />
              <Text style={homeStyles.greetingText}>{user ? `${user.nom} ${user.prenom}` : ''}</Text>
              <Text style={homeStyles.Text}>Email: {user ? user.email : ''}</Text>
          </View>
          <View style={homeStyles.Container}>
              <TouchableOpacity style={homeStyles.editButton} onPress={goToProfil}>
                  <FontAwesome name="edit" style={homeStyles.editIcon} />
                  <Text style={homeStyles.editText}>Modifier le profil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={homeStyles.editButton} onPress={goToPassword}>
                  <FontAwesome name="edit" style={homeStyles.editIcon} />
                  <Text style={homeStyles.editText}>Changer le mot de passe</Text>
              </TouchableOpacity>
          </View>
      </View>
  )
}

export default Profil ;