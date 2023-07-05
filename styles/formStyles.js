import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    // Autres styles...

    col: {
        color: 'black'
    },
    text: {
        fontWeight: 'bold',
        marginVertical: height * 0.01,
        fontSize: width * 0.08,
        textAlign: 'center',
        color: 'black'
    },
    textc: {
        marginVertical: height * 0.01,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
    input: {
        height: height * 0.06,
      //  width: width * 0.6,
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: width * 0.01,
        marginTop: height * 0.01,
        borderColor: '#D8BFD8', // Couleur de bordure par défaut
    },

    inputError: {
        borderColor: 'red', // Couleur de bordure pour les champs de saisie en erreur
    },


    button: {
        backgroundColor: '#D8BFD8',
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.03,
        borderRadius: 8,
        width: width * 0.3,
        alignSelf: 'center',
        marginTop: height * 0.02,
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.04,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        resizeMode: 'cover',
        height: 75,
        width: 150,
        alignSelf: 'center',
        marginTop:20
    },
    imgp: {
        height: height * 0.15,
        width: width * 0.3,
        alignSelf: 'center',
        borderRadius: (height * 0.15) / 2,
        borderWidth: 2,
        borderColor: '#fff',
    },
    iconContainer: {
        position: 'absolute',
        marginTop: height * 0.23,
        left: '95%',
        transform: [
            { translateX: -20 },
            { translateY: -20 },
        ],
    },
    icon: {
        fontSize: 20,
        color: '#D8BFD8',
    },
    passwordIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: height * 0.06,
        width: width * 0.6,
        borderColor: '#D8BFD8',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: width * 0.01,
        marginTop: height * 0.01,
    },
    passwordInput: {
        flex: 1,
        height: 40,
    },
    passwordIcon: {
        marginLeft: 10,
    },

    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});
