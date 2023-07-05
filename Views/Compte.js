import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import appStyles from '../styles/appStyles';
import formStyles from '../styles/formStyles';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export async function registerUser(nom, prenom, email, password, image) {
    try {
        if (typeof image === 'number') {
            image = { uri: "require('../assets/prof.png')" };
        }

        const response = await axios.post('http://192.168.30.152:80/register', { nom, prenom, email, password, image: image });
        return Promise.resolve(response.data.mssg); // Renvoyer la réponse du serveur
    } catch (error) {
        return Promise.reject({ error });
    }
}

const validationSchema = yup.object().shape({
    name: yup.string().required('Le nom est requis'),
    prenom: yup.string().required('Le prénom est requis'),
    email: yup.string().email("L'email doit être valide").required("L'email est requis"),
    password: yup.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères').required('Le mot de passe est requis'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Les mots de passe ne correspondent pas').required('La confirmation du mot de passe est requise'),
});

function Compte() {
    const defaultImageSource = require('../assets/prof.png');
    const [image, setSelectedImageSource] = useState(defaultImageSource);

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync();
        try {
            if (!result.cancelled) {
                setSelectedImageSource({ uri: result.assets[0].uri });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleCreateAccount = async (values) => {
        console.log('Account created:', values);
        try {
            const response = await registerUser(values.name, values.prenom, values.email, values.password, image);
            console.log('Server response:', response);
            if (response === "Cet email existe déjà") {
                Alert.alert('Erreur', response);
            } else {
                Alert.alert('Succès', "Veuillez vérifier votre compte à l'adresse e-mail.");
                formik.resetForm();
                setSelectedImageSource(defaultImageSource);
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            prenom: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleCreateAccount,
    });

    return (
        <View style={appStyles.container}>
            <Image source={image} style={formStyles.imgp} />
            <TouchableOpacity onPress={handleImagePicker} style={formStyles.iconContainer}>
                <FontAwesome name="image" style={formStyles.icon} />
            </TouchableOpacity>

           
            <TextInput
                style={[
                    formStyles.input,
                    formik.touched.name && formik.errors.name && formStyles.inputError,
                ]}
                placeholder="Nom"
                value={formik.values.name}
                onChangeText={formik.handleChange('name')}
                onBlur={formik.handleBlur('name')}
            />

            {formik.touched.name && formik.errors.name ? (
                <Text style={formStyles.errorText}>{formik.errors.name}</Text>
            ) : null}

            <TextInput
                style={[
                    formStyles.input,
                    formik.touched.prenom && formik.errors.prenom && formStyles.inputError,
                ]}
                placeholder="Prénom"
                value={formik.values.prenom}
                onChangeText={formik.handleChange('prenom')}
                onBlur={formik.handleBlur('prenom')}
            />
            {formik.touched.prenom && formik.errors.prenom ? (
                <Text style={formStyles.errorText}>{formik.errors.prenom}</Text>
            ) : null}

            <TextInput
                style={[
                    formStyles.input,
                    formik.touched.email && formik.errors.email && formStyles.inputError,
                ]}
                placeholder="Email"
                value={formik.values.email}
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                keyboardType="email-address"
            />
            {formik.touched.email && formik.errors.email ? (
                <Text style={formStyles.errorText}>{formik.errors.email}</Text>
            ) : null}

            <TextInput
                style={[
                    formStyles.input,
                    formik.touched.password && formik.errors.password && formStyles.inputError,
                ]}
                placeholder="Mot de passe"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                secureTextEntry
            />
            {formik.touched.password && formik.errors.password ? (
                <Text style={formStyles.errorText}>{formik.errors.password}</Text>
            ) : null}

            <TextInput
                style={[
                    formStyles.input,
                    formik.touched.confirmPassword && formik.errors.confirmPassword && formStyles.inputError,
                ]}
                placeholder="Confirmer le mot de passe"
                value={formik.values.confirmPassword}
                onChangeText={formik.handleChange('confirmPassword')}
                onBlur={formik.handleBlur('confirmPassword')}
                secureTextEntry
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <Text style={formStyles.errorText}>{formik.errors.confirmPassword}</Text>
            ) : null}

            <TouchableOpacity style={formStyles.button} onPress={formik.handleSubmit}>
                <Text style={formStyles.buttonText}>S'inscrire</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Compte;
