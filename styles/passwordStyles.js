import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    contentContainer: {
        backgroundColor: '#FCE7FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FCE7FF',
        borderRadius: 20,
        paddingVertical: height * 0.09, // Ajuster la valeur de padding selon vos besoins
        paddingHorizontal: width * 0.1, // Ajuster la valeur de padding selon vos besoins
        marginTop: height * 0.1,
        margin: height * 0.04,
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'pink',
        fontSize: width * 0.07,
        marginBottom: height * 0.04,
    },
    input: {
        height: height * 0.06,
        width: width * 0.6,
        borderColor: 'pink',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: width * 0.01,
        marginTop: height * 0.04,
    },
    button: {
        backgroundColor: 'pink',
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.03,
        borderRadius: 8,
        width: width * 0.3,
        alignSelf: 'center',
        marginTop: height * 0.04,
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.04,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
