import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { auth } from '../firebase';
import axios from 'axios';
import { KeyboardAvoidingView } from 'react-native';

export default function HomeScreen (props) {

    const [ticker, setTicker] = useState('');
    const [marketOpen, setMarketOpen] = useState(null);


    const getMarketOpen = async () => {
        var query = 'https://api.polygon.io/v1/marketstatus/now?apiKey=EepXZYpz1RiHneHcnRHQupa8To6g53Dv'
        
        var data;

        try {
            data = await axios.get(query)
            .then(response => {
                alert('The market is ' + response.data.market);
                if (response.data.market == 'closed') {
                    setMarketOpen(false);
                } else {
                    setMarketOpen(true);
                }
            })
        } catch (error) {
            alert(error)
        }
        

        /*
        const data = axios.get(
            query,
            {
            headers: {
                'Authorization': 'Bearer EepXZYpz1RiHneHcnRHQupa8To6g53Dv'
            }
            }
        );

        */
        
        
    }

    useEffect(() => {

        getMarketOpen();
            
    }, []);

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
    <KeyboardAvoidingView style={[styles.container, marketOpen? styles.openMarket : styles.closedMarket]} behavior='padding'>
        <View style={styles.header}>
            <Text style={[styles.headerText, marketOpen? styles.headerText : styles.darkModeText]}> Welcome, {auth.currentUser?.email}!</Text>
            {marketOpen? <Text style={[styles.headerText, marketOpen? styles.headerText : styles.darkModeText]}> The market is open!</Text> : <Text style={[styles.headerText, marketOpen? styles.headerText : styles.darkModeText]}> The market is closed!</Text>}
        </View>
      

      <View style={styles.buttonContainer}>
        <Text style={[styles.text, marketOpen? styles.text : styles.darkModeText]}>Please enter a stock ticker you would like to view.</Text>
          <TextInput style={styles.input} placeholder='Ticker (Ex. AAPL)' />
          
            <TouchableOpacity style={styles.button} onPress={handleViewData} >
                <Text style={styles.buttonText}>View Stock Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.outlinedButton]} onPress={handleLogOut} >
                <Text style={styles.buttonOutlinedText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    openMarket: {
        backgroundColor: '#97ff94',
    },
    closedMarket: {
        backgroundColor: '#1f1f1f',
    },
    headerText: {
        fontSize: 25,
        padding: 20,
        marginTop: 40,
        textAlign: 'center',
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
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',


    },
    button: {
        backgroundColor: '#228CDB',
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
        borderColor: '#228CDB',
        borderWidth: 1,
        marginTop: 60,
    },
    buttonOutlinedText: {
        color: '#228CDB',
        fontSize: 18,
        fontWeight: '700',
    },
    darkModeText: {
        color: 'white',

    },
    
});