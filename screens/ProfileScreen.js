import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, addDoc, getDoc, getFirestore, doc } from "firebase/firestore"; 

const ProfileScreen = () => {

    const auth = getAuth();
    const nav = useNavigation();
    const database = getFirestore();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');

    const handleLogOut = () => {
        auth
            .signOut()
            .then(() => {
                nav.replace('Auth');
            })
            .catch(error => {
                alert(error);
            })
            
    }

    const getUserData = async () => {

            const ref = collection(database, "UserData");
            const docRef = doc(ref, auth.currentUser.uid);
            getDoc(docRef)
                .then(doc => {
    
                    setFirstName(doc.data().first);
                    setLastName(doc.data().last);
                    setAge(doc.data().age);
                })
                .catch(error => {
                    alert(error);
                })


        
    }

    useEffect(() => {

        getUserData();
            
    }, []);

  return (

    <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Name: {firstName + ' ' + lastName}</Text>
                <Text style={styles.infoText}>Age: {age}</Text>
                <Text style={styles.infoText}>Email: {auth.currentUser.email}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.outlinedButton]} onPress={handleLogOut} >
                    <Text style={styles.buttonOutlinedText}>Log Out</Text>
                </TouchableOpacity>
            </View>
            
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1f1f1f',
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
        paddingBottom: 30,
        marginTop: 10,
        textAlign: 'center',
        color: 'tomato',
    },
    infoText: {
        fontSize: 18,
        padding: 20,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'tomato',
        color: 'white',
        
    },
    infoContainer: {
        flex: 1,
        width: '80%',
        
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
    },
    buttonContainer: {
        width: '60%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,


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
        marginTop: 40,
        
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
