import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getFirestore, setDoc, doc, getDoc } from "firebase/firestore"; 
import axios from 'axios';


const NewsScreen = () => {

    const auth = getAuth();
    const nav = useNavigation();
    const database = getFirestore();

    const [tickers, setTickers] = useState([]);
    const [news, setNews] = useState([]);

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

    const getNews = async (ticker) => {
            
        //alert(ticker);
        var query = 'https://api.polygon.io/v2/reference/news?ticker=' + ticker + '&order=asc&limit=1&apiKey=EepXZYpz1RiHneHcnRHQupa8To6g53Dv'
        
        var data;

        try {
            data = await axios.get(query)
            .then(response => {

                
                //alert(response.data.results[0].headline);
                setNews(news.concat(response.data.results[0]))
            })
        } catch (error) {
            //alert(error)
        }
    
    }

    const compileNews = async () => {

        getUserWatchlist()
        .then(() => {
            for (let i = 0; i < 3; i++) {
                if (tickers[i]) {
                    getNews(tickers[i]);
                }
            }
        })
        .catch(error => {
            alert(error);
        })

    }
    
    useEffect(() => {
        setNews([]);
        compileNews();
    }, []);

     
  return (
        <View style={styles.container}>
        <Text style={styles.title}>News</Text>
            {news.map(news => {
                return (
                    <View>
                        <Text style={styles.text} >{news.title}</Text>
                    </View>
                )
            })}
        </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#1f1f1f',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
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
        fontSize: 18,
        padding: 10,
        marginTop: 5,
        textAlign: 'center',
        color: 'white',
        borderColor: 'tomato',
        borderWidth: 1,
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
    title: {
        fontSize: 30,
        padding: 20,
        paddingBottom: 40,
        marginTop: 10,
        textAlign: 'center',
        color: 'tomato',
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
    },
    image: {
        width: 100,
        height: 100,
        margin: 10
    }
    
});
