// appStyles.js

import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

        paddingVertical:10 , 
        paddingHorizontal:20, 
        backgroundColor: '#DCDCDC',
        
        
        

    },
  
});
