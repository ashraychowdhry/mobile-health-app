import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import ScreensManager from './screens/ScreensManager';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
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
        <Stack.Screen name="Stock Tracker"  component={ScreensManager} />
      </Stack.Navigator>
    </NavigationContainer>
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
