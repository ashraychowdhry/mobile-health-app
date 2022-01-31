import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import ScreensManager from './screens/ScreensManager';
import RegisterScreen from './screens/RegisterScreen';

import { ToastProvider } from 'react-native-fast-toast'
import TickerInfoScreen from './screens/TickerInfoScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator 
        screenOptions={{
            headerStyle: {
              backgroundColor: 'tomato'
            },
            headerTintColor: '#fff'
        }} initialRouteName="Auth">
          
          <Stack.Screen name="Auth" options={{headerShown: false}} component={AuthScreen} />
          <Stack.Screen name="Register" options={{headerShown: false}} component={RegisterScreen} />
          <Stack.Screen name="Ticker" component={TickerInfoScreen} />
          <Stack.Screen name="Stock Tracker"  component={ScreensManager} />
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
