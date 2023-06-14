// appStyles.js

import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: height * 0.1, // Utilisation de 10% de la hauteur de l'écran comme padding vertical
        paddingHorizontal: width *0.2, // Utilisation d'une valeur fixe de padding horizontal
        backgroundColor: 'white',
    },
  
});
