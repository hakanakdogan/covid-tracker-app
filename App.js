import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import axios from 'axios';
import { AppNavigator } from './navigation/AppNavigator';
import { NavigationContainer } from "@react-navigation/native"
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import countryReducer from './store/reducer/countryReducer';
import { init } from './helpers/db';

export default function App() {
  useEffect(() => {
    init().then(() => {
      console.log('Initialized database');
    }).catch((err) => {
      console.log('An error ocurred');
      console.log(err);
    })
  }, [])



  const rootReducer = combineReducers({
    countryReducer: countryReducer
  })

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
