import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider} from 'react-redux';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { HomeScreen} from './screens/home.screen'
import { LoginScreen} from './screens/login.screen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Login" component={ 
              LoginScreen }
         />
      
          
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
