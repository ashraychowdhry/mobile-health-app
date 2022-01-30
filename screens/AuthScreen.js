import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from '../firebase';



const AuthScreen = () => {

    const auth = getAuth();

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

    const handleGoToRegister = () => {
        nav.replace('Register');
    }

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {res => {
                console.log('SUCCESS - Logged in user ' + userCred.user);
            }})
            .catch(error => {
                alert(error);
            })
    }


  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>

        <View>
            <Text style={styles.title}>Stock Tracker</Text>
        </View>
      
        <View style={styles.inputsContainer}>
            <TextInput placeholder='Email' value={email} onChangeText={e => setEmail(e)} style={styles.input} />
            <TextInput placeholder='Password' value={password} onChangeText={p => setPassword(p)} style={styles.input} secureTextEntry/>

        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLogin} >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.outlinedButtonContainer}>
            <TouchableOpacity style={[styles.button, styles.outlinedButton]} onPress={handleGoToRegister} >
                <Text style={styles.buttonOutlinedText}>Not Registered? Make an Account Now</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputsContainer: {
        width: '80%',
    },
    title: {
        fontSize: 40,
        padding: 20,
        paddingBottom: 140,
        marginTop: 10,
        textAlign: 'center',
        color: 'tomato',
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
        marginTop: 40,
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
        marginTop: 5,
    },
    buttonOutlinedText: {
        color: 'tomato',
        fontSize: 14,
        fontWeight: '700',
    },
    outlinedButtonContainer: {
        width: '80%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
    
});
