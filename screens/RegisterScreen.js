import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = () => {

    const auth = getAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nav = useNavigation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                nav.replace('Stock Tracker');
            }
        });
        return unsubscribe;
    }, []);

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {userCred => {
                console.log('SUCCESS - Registered user ' + userCred.user);
            }})
            .catch(error => {
                alert(error);
            })
    }

    const handleBackToLogin = () => {
        nav.replace('Auth');
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>

        <View>
            <Text style={styles.title}>Stock Tracker</Text>
            <Text style={styles.headerText}>Please fill out all fields below</Text>
        </View>

        <View style={styles.inputsContainer}>
            <TextInput placeholder='First Name' value={firstName} onChangeText={f => setFirstName(f)} style={styles.input} />
            <TextInput placeholder='Last Name' value={lastName} onChangeText={l => setLastName(l)} style={styles.input} />
            <TextInput placeholder='Age' value={age} onChangeText={a => setAge(a)} style={styles.input} />
            <TextInput placeholder='Email Address' value={email} onChangeText={e => setEmail(e)} style={styles.input} />
            <TextInput placeholder='Password' value={password} onChangeText={p => setPassword(p)} style={styles.input} secureTextEntry/>

        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleRegister} >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.outlinedButton]} onPress={handleBackToLogin} >
                <Text style={styles.buttonOutlinedText}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    openMarket: {
        backgroundColor: '#97ff94',
    },
    closedMarket: {
        backgroundColor: '#1f1f1f',
    },
    title: {
        fontSize: 40,
        padding: 20,
        paddingBottom: 140,
        marginTop: 10,
        textAlign: 'center',
        color: 'tomato',
    },
    headerText: {
        fontSize: 25,
        padding: 20,
        marginTop: 10,
        textAlign: 'center',
        color: 'tomato',
    },
    text: {
        fontSize: 20,
        padding: 30,
        marginTop: 10,
        textAlign: 'center',
    },
    inputsContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: 'tomato',
        borderWidth: 1,
    },
    buttonContainer: {
        width: '60%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',


    },
    button: {
        backgroundColor: 'tomato',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',

    },
    outlinedButton: {
        backgroundColor: 'white',
        borderColor: 'tomato',
        borderWidth: 1,
        marginTop: 60,
    },
    buttonOutlinedText: {
        color: 'tomato',
        fontSize: 18,
        fontWeight: '700',
    },
    darkModeText: {
        color: 'white',

    },

});
