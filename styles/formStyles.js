import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    // Autres styles...
    container:{
        borderWidth:3,
        borderColor: '#FCE7FF',
        borderRadius: 20,
        backgroundColor: 'white',
        paddingLeft:20,
        paddingRight: 20,
       
        

    },
    col: {
        color: 'black'
    },
    text: {
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize:25,
        textAlign: 'center',
        color: 'black'
    },
    textc: {
        marginVertical: 10,
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
    input: {
        height: 45,
        
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
        borderColor: 'rgb(143, 71, 155)', // Couleur de bordure par défaut
    },

    inputError: {
        borderColor: 'red', // Couleur de bordure pour les champs de saisie en erreur
    },


    button: {
        height: 40,

       
        borderRadius: 8,
       
        marginTop: 10,
       backgroundColor: 'rgb(143, 71, 155)', // Couleur de bordure par défaut
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop:10
    },
    image: {
        resizeMode: 'cover',
        height: 75,
        width: 150,
        alignSelf: 'center',
        marginTop:20
    },
    imgp: {
        height: 120,
        width: 120,
        alignSelf: 'center',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#fff',
        
      
    },
    iconContainer: {
        position: 'absolute',
        

      
    },
    icon: {
        fontSize: 20,
        color: 'rgb(143, 71, 155)',
        paddingTop: 80,
       paddingLeft: 60
       

    },
    icon2: {
        fontSize: 20,
        color: 'rgb(143, 71, 155)',
        paddingTop: 20,
        paddingLeft: 0


    },
    passwordIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,

        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 20,
        borderColor: 'rgb(143, 71, 155)',
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
