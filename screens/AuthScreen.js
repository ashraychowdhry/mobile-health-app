import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nav = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                nav.replace('Home');
            }
        }); 
        return unsubscribe;
    }, []);

    const handleRegister = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(() => {userCred => {
                console.log('SUCCESS - Registered user ' + userCred.user);
            }})
            .catch(error => {
                alert(error);
            })
    }

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {res => {
                console.log('SUCCESS - Logged in user ' + userCred.user);
            }})
            .catch(error => {
                alert(error);
            })
    }


  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      
        <View style={styles.inputsContainer}>
            <TextInput placeholder='Email' value={email} onChangeText={e => setEmail(e)} style={styles.input} />
            <TextInput placeholder='Password' value={password} onChangeText={p => setPassword(p)} style={styles.input} secureTextEntry/>

        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLogin} >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.outlinedButton]} onPress={handleRegister} >
                <Text style={styles.buttonOutlinedText}>Register</Text>
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
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        width: '60%',
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',


    },
    button: {
        backgroundColor: '#228CDB',
        width: '100%',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',

    },
    outlinedButton: {
        backgroundColor: 'white',
        borderColor: '#228CDB',
        borderWidth: 1,
        marginTop: 5,
    },
    buttonOutlinedText: {
        color: '#228CDB',
        fontSize: 18,
        fontWeight: '700',
    },
    
});
