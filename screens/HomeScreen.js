import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { KeyboardAvoidingView } from 'react-native';
import { useToast } from 'react-native-fast-toast'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function HomeScreen (props) {

    const auth = getAuth();

    const [ticker, setTicker] = useState('');
    const [marketOpen, setMarketOpen] = useState(null);

    const toast = useToast();


    const getMarketOpen = async () => {
        var query = 'https://api.polygon.io/v1/marketstatus/now?apiKey=EepXZYpz1RiHneHcnRHQupa8To6g53Dv'
        
        var data;

        try {
            data = await axios.get(query)
            .then(response => {

                toast.show('The market is ' + response.data.market, {
                    type: 'success',
                    position: 'top',
                    duration: 10000,
                    offset: 30,
                    animationType: 'slide-in'
              });
                
                //alert('The market is ' + response.data.market);
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
    const handleViewData = async () => {


        //https://api.polygon.io/v1/meta/symbols/AAPL/company?apiKey=EepXZYpz1RiHneHcnRHQupa8To6g53Dv

        var query = 'https://api.polygon.io/v1/meta/symbols/' + ticker + '/company?apiKey=EepXZYpz1RiHneHcnRHQupa8To6g53Dv'
        //query = 'https://api.polygon.io/v1/meta/symbols/AAPL/company?apiKey=EepXZYpz1RiHneHcnRHQupa8To6g53Dv'
        
        var data;

        try {
            data = await axios.get(query)
            .then(response => {
                nav.navigate('Ticker', {
                    logo: response.data.logo,
                    symbol: response.data.symbol,
                    name: response.data.name,
                    sector: response.data.sector,
                    ceo: response.data.ceo,
                    employees: response.data.employees,
                    description: response.data.description,
                    marketcap: response.data.marketcap,
                })
            })
        } catch (error) {
            alert(error)
        }
       
    }
       

    
  return (
    <KeyboardAvoidingView style={[styles.container, marketOpen? styles.openMarket : styles.closedMarket]} behavior='padding'>
        <View style={styles.header}>
            <Text style={[styles.headerText, marketOpen? styles.headerText : styles.darkModeText]}> Welcome, {auth.currentUser?.email}!</Text>
            {marketOpen? <Text style={[styles.headerText, marketOpen? styles.headerText : styles.darkModeText]}>The market is open!</Text> : <Text style={[styles.headerText, marketOpen? styles.headerText : styles.darkModeText]}>The market is closed!</Text>}
        </View>
      

      <View style={styles.buttonContainer}>
        <Text style={[styles.text, marketOpen? styles.text : styles.darkModeText]}>Please enter a stock ticker you would like to view.</Text>
          <TextInput style={styles.input} value={ticker} onChangeText={t => setTicker(t)} placeholder='Ticker (Ex. AAPL)' />
          
            <TouchableOpacity style={styles.button} onPress={handleViewData} >
                <Text style={styles.buttonText}>View Stock Data</Text>
            </TouchableOpacity>
            
        </View>
        <View style={styles.emptySpacer}>
            
        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
        marginTop: 20,
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
        width: '100%',
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
    emptySpacer: {
        flex: 1,
    }
    
});