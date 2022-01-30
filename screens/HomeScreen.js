import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../firebase';

export default function HomeScreen () {

    const [ticker, setTicker] = useState('');

    const nav = useNavigation();
    const handleViewData = () => {

    }
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

    
  return (
    <View style={styles.container}>
      <Text>Welcome, {auth.currentUser?.email}!</Text>

      <View style={styles.buttonContainer}>
        <Text>Please enter a stock ticker you would like to view.</Text>
          <TextInput style={styles.input} placeholder='Ticker (Ex. AAPL)' />
          
            <TouchableOpacity style={styles.button} onPress={handleViewData} >
                <Text style={styles.buttonText}>View Stock Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.outlinedButton]} onPress={handleLogOut} >
                <Text style={styles.buttonOutlinedText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

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