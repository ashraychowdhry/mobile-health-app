import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';


const NewsScreen = () => {

    const getMarketNews = async () => {
        var query = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=e9f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8'
        var data;
    }
    
    useEffect(() => {
        getMarketNews();
    }, []);

    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>News</Text>
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
