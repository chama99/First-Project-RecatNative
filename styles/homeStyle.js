import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    appbar: {
        backgroundColor: '#fff',
        elevation: 0,
    },
    appbarTitle: {
        color: '#000',
        fontSize: height * 0.02,
        fontWeight: 'bold',
    },
     contentContainer: {
        backgroundColor: '#FCE7FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
         borderColor: '#FCE7FF',
        borderRadius: 8,
         padding: height * 0.05,
         marginTop: height * 0.08,
         margin: height * 0.02,
    },
    Container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 8,
        padding: height * 0.05,

        margin: height * 0.02,
    },
    greetingText: {
        marginVertical: height * 0.01, // Utilisation de 1% de la hauteur de l'écran comme marge verticale
        textAlign: 'center',
        marginBottom: height * 0.05,
        fontWeight: 'bold',
        fontSize: width * 0.05, // Utilisation de 5% de la largeur de l'écran comme taille de police
    },
    email: {
        marginVertical: height * 0.01, // Utilisation de 1% de la hauteur de l'écran comme marge verticale
        textAlign: 'center',
        marginBottom: height * 0.05,
      
        fontSize: width * 0.05, // Utilisation de 5% de la largeur de l'écran comme taille de police
    },
    profileImage: {
        height: height * 0.15,
        width: width * 0.3,
        alignSelf: 'center',
        borderRadius: (height * 0.15) / 2,
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: height * 0.02,
        marginBottom: height * 0.05,
    },

    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height * 0.05,
    },
    whiteButton: {
        backgroundColor: '#fff',
        padding: height * 0.015,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
       
        marginTop: height * 0.02,
    },
    editIcon: {
        fontSize: 20,
        marginRight: 5,
        color: 'black',
    },
    editText: {
        fontSize: 16,
        color: 'black',
    },

});
