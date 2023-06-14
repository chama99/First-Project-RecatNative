// formStyles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    text: {
        fontWeight: 'bold',
        marginVertical: 4,
        fontSize:40,
        textAlign:'center'
    },
    input: {
        height: 40,
        width:250,
        borderColor: 'pink',
        borderWidth: 2,
        marginBottom: 30,

        borderRadius: 5,
        paddingHorizontal: 15,
    },
    button: {
        backgroundColor: 'pink',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
       
    },
    image:{
    resizeMode: 'cover',
    height: 250,
    width: 500,
    alignSelf: 'center',
   
    }
});
