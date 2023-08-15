import React, { useState } from 'react';
import { Image, TextInput, TouchableOpacity, Text, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFormik } from 'formik';
import formStyles from '../styles/formStyles';

import * as yup from 'yup';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importation d'AsyncStorage

export async function login(email, password) {
    try {
        const response = await axios.post('http://192.168.30.112:8080/login', {
            email,
            password
        });

        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject({ error });
    }
}

const validationSchema = yup.object().shape({
    email: yup.string().email("L'email doit être valide").required("L'email est requis"),
    password: yup.string().required('Le mot de passe est requis'),
});

const Connexion = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false); // Ajout de l'état passwordVisible

    const handleCreateAccount = async (values) => {
        console.log('Account created:', values);
        try {
            if (formik.isValid) {
                const response = await login(values.email, values.password);
                console.log(response);

                if (
                    response.mssg === 'Mot de passe ou email invalide' ||
                    response.mssg === "L'e-mail n'a pas été vérifié."
                ) {
                    Alert.alert('Erreur', response.mssg);
                } else {
                    // Stocker le jeton d'accès localement avec AsyncStorage
                    await AsyncStorage.setItem('accessToken', response.token);

                    console.log('Token:', response.user);
                    formik.resetForm();
                    navigation.navigate('Home', { id: response.user._id });
                }
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleCreateAccount
    });

    const goToCreateAccount = () => {
        navigation.navigate('Compte');
    };

    const goToForgetPassword = () => {
        navigation.navigate('ResetPassword');
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); // Mettre à jour l'état passwordVisible
    };

    return (
        <View style={formStyles.view}>
        
            <View style={formStyles.container}>
                <Image source={require('../assets/whitecape1.png')} style={formStyles.image} />
                {formik.touched.email && formik.errors.email && (
                    <Text style={formStyles.errorText}>{formik.errors.email}</Text>
                )}
                <TextInput
                    style={formStyles.input}
                    placeholder="Adresse e-mail"
                    keyboardType="email-address"
                    value={formik.values.email}
                    onChangeText={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                />

                {formik.touched.password && formik.errors.password && (
                    <Text style={formStyles.errorText}>{formik.errors.password}</Text>
                )}
                <View style={formStyles.passwordIconContainer}>
                    <TextInput
                        style={formStyles.passwordInput}
                        placeholder="Mot de passe"
                        secureTextEntry={!passwordVisible} // Utiliser la valeur de passwordVisible pour définir secureTextEntry
                        value={formik.values.password}
                        onChangeText={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                    />
                    <TouchableOpacity style={formStyles.passwordIcon} onPress={togglePasswordVisibility}>
                        <Ionicons name={passwordVisible ? 'md-eye' : 'md-eye-off'} style={formStyles.eye} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={formStyles.button} onPress={formik.handleSubmit}>
                    <Text style={formStyles.buttonText}>Se connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToForgetPassword}>
                    <Text style={formStyles.textc}>Mot de passe oublié ?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={goToCreateAccount}>
                    <Text style={formStyles.textc}>Créer nouveau compte</Text>
                </TouchableOpacity>

                </View>
                
        </View>
    );
};

export default Connexion;