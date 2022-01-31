import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getFirestore, setDoc, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore"; 

const WatchlistScreen = () => {

    const auth = getAuth();
    const database = getFirestore();

    const [addTicker, setAddTicker] = useState('');
    const [tickers, setTickers] = useState([]);


    const nav = useNavigation();

    const getUserWatchlist = async () => {

        const ref = collection(database, "UserWatchlist");
        const docRef = doc(ref, auth.currentUser.uid);
            getDoc(docRef)
                .then(doc => {

                    setTickers(doc.data().tickers);
                    //alert(doc.data().tickers);
                })
                .catch(error => {
                    alert(error);
                })

    }

    useEffect(() => {
        getUserWatchlist();
    }, []);

    const handleAddTicker = () => {

        const UserWatchlistRef = collection(database, "UserWatchlist");
        
        updateDoc(doc(UserWatchlistRef, auth.currentUser.uid), {
            tickers: arrayUnion(addTicker)
        })
        .then(() => {
            console.log("Watchlist updated");
            getUserWatchlist();
        })
        .catch (error => {
            alert(error);
        });

        
            
    }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>

        <View>
            <Text style={styles.title}>Watchlist</Text>
        </View>
        {tickers.map(ticker => {
            return (
                <View>
                    <Text style={styles.text} >{ticker}</Text>
                </View>
            )
        })}
      
        <View style={styles.inputsContainer}>
            <TextInput placeholder='Ticker (ex. AAPL)' value={addTicker} onChangeText={a => setAddTicker(a)} style={styles.input} />

        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAddTicker} >
                <Text style={styles.buttonText}>Add Ticker</Text>
            </TouchableOpacity>

        </View>
    </KeyboardAvoidingView>
  );
};

export default WatchlistScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        paddingBottom: 40,
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
        padding: 10,
        marginTop: 10,
        textAlign: 'center',
        color: 'tomato',
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
