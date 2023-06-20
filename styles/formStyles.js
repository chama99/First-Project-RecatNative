// formStyles.js

import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    col:{
        color:'black'
    },
    text: {
        fontWeight: 'bold',
        marginVertical: height * 0.01, // Utilisation de 1% de la hauteur de l'écran comme marge verticale
        fontSize: width * 0.08, // Utilisation de 5% de la largeur de l'écran comme taille de police
        textAlign: 'center',
        color:'rgb(147,112,300)'
    },
    textc:{
        marginVertical: height * 0.01, // Utilisation de 1% de la hauteur de l'écran comme marge verticale
         // Utilisation de 5% de la largeur de l'écran comme taille de police
        textAlign: 'center',
        color: 'rgb(147,112,300)'
    },
    input: {
        height: height * 0.06,
        width: width * 0.6, // Utilisation de 60% de la largeur de l'écran comme largeur de l'input
        borderColor: 'pink',
        borderWidth: 2,
       
        borderRadius: 8,
        paddingHorizontal: width * 0.01,
        marginTop: height * 0.01,
    },
   
    button: {
        backgroundColor: 'pink',
        paddingVertical: height * 0.01, // Utilisation de 2% de la hauteur de l'écran comme padding vertical
        paddingHorizontal: width * 0.03, // Utilisation de 5% de la largeur de l'écran comme padding horizontal
        borderRadius: 8,
        width: width* 0.3,
        alignSelf: 'center', // Aligner le bouton au centre horizontalement
        marginTop: height * 0.02,
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.04, // Utilisation de 4% de la largeur de l'écran comme taille de police
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        resizeMode: 'cover',
        height: height * 0.3, // Utilisation de 30% de la hauteur de l'écran comme hauteur de l'image
        width: width * 0.9, // Utilisation de 90% de la largeur de l'écran comme largeur de l'image
        alignSelf: 'center',
    },
    imgp: {
        resizeMode: 'cover',
        height: height * 0.15, // Utilisation de 30% de la hauteur de l'écran comme hauteur de l'image
        width: width * 0.3, // Utilisation de 90% de la largeur de l'écran comme largeur de l'image
        alignSelf: 'center',
        borderRadius: 50,
    },
    iconContainer: {
        position: 'absolute',
        marginTop: height * 0.23,
        left: '95%',
        transform: [
            { translateX: -20 }, // Adjust the value to center the icon horizontally
            { translateY: -20 }, // Adjust the value to center the icon vertically
        ],
    },
    icon: {
        fontSize: 20,
        color: 'pink',
    },
});
