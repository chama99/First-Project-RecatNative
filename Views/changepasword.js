import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import formStyles from '../styles/formStyles';
import appStyles from '../styles/appStyles';
import axios from 'axios';

export async function ModifierPassword(id, password) {
    try {
        const response = await axios.patch('http://192.168.30.181:8080/UpdatePassword', { id, password });
        return Promise.resolve(response.data); // Renvoyer la réponse du serveur
    } catch (error) {
        return Promise.reject({ error });
    }
}

const passwordSchema = Yup.object().shape({
    actuelpassword: Yup.string().required("S'il vous plaît entrez votre mot de passe actuel"),
    password: Yup.string()
        .required("S'il vous plaît entrez votre nouveau mot de passe.")
        .matches(
            /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/,
            'Le mot de passe doit contenir au moins une lettre majuscule, un symbole, un chiffre et avoir une longueur minimale de 8 caractères'
        ),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe ne correspondent pas.'),
});

const comparePassword = (password, hashedPassword) => {
    const match = bcrypt.compareSync(password, hashedPassword);
    return match;
};

function Password({ route }) {
    const { user } = route.params;

    const [isSuccess, setIsSuccess] = useState(false);
    const formRef = useRef(null);

    const handleCreateAccount = async (values, { resetForm }) => {
        try {
            await passwordSchema.validate(values, { abortEarly: false });

            // Check if the entered actuelpassword matches the user's current password
            const isMatch = comparePassword(values.actuelpassword, user.password);
            if (!isMatch) {
                console.log('Mot de passe incorrect');
                Alert.alert('Erreur', 'Mot de passe actuel incorrect');
                return;
            }

            // If the validations and password match are successful, continue with the password modification
            const id = user._id;
            const response = await ModifierPassword(id, values.password);
            console.log('Server response:', response.mssg);
            setIsSuccess(true);

            // Reset the Formik form after a successful password modification
            resetForm({ values: { actuelpassword: '', password: '', confirmPassword: '' } });
        } catch (error) {
            // If the validations fail, setIsSuccess to false
            setIsSuccess(false);
        }
    };

    return (
        <View style={appStyles.container}>
            <Formik
                initialValues={{ actuelpassword: '', password: '', confirmPassword: '' }}
                onSubmit={(values, actions) => handleCreateAccount(values, actions)}
                validationSchema={passwordSchema}
                innerRef={(formik) => (formRef.current = formik)}
            >
                {({ handleChange, handleSubmit, values, touched, errors }) => (
                    <View style={formStyles.container}>
                        <Text style={formStyles.text}>Changer le mot de passe</Text>
                        {touched.actuelpassword && errors.actuelpassword && (
                            <Text style={formStyles.errorText}>{errors.actuelpassword}</Text>
                        )}
                        <TextInput
                            style={formStyles.input}
                            placeholder="Mot de passe actuel"
                            value={values.actuelpassword}
                            onChangeText={handleChange('actuelpassword')}
                            secureTextEntry
                            onBlur={() => setIsSuccess(false)}
                        />
                        {touched.password && errors.password && <Text style={formStyles.errorText}>{errors.password}</Text>}
                        <TextInput
                            style={formStyles.input}
                            placeholder="Nouveau mot de passe"
                            value={values.password}
                            onChangeText={handleChange('password')}
                            secureTextEntry
                            onBlur={() => setIsSuccess(false)}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                            <Text style={formStyles.errorText}>{errors.confirmPassword}</Text>
                        )}
                        <TextInput
                            style={formStyles.input}
                            placeholder="Confirmer le mot de passe"
                            value={values.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            secureTextEntry
                            onBlur={() => setIsSuccess(false)}
                        />
                        {isSuccess && <Text style={{ color: 'green' }}>Mot de passe modifié avec succès!</Text>}
                        <TouchableOpacity style={formStyles.button} onPress={() => formRef.current.submitForm()}>
                            <Text style={formStyles.buttonText}>Enregistrer</Text>
                        </TouchableOpacity>

                    </View>
                )}
            </Formik>
        </View>
    );
}

export default Password;
