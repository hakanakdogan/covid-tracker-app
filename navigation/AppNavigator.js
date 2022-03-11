import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import WorldCaseScreen, { screenOptions as WorldCaseScreenOptions } from '../screens/WorldCaseScreen';
import SearchIndividualCountryScreen, { screenOptions as SearchIndividualScreenOptions } from '../screens/SearchIndividualCountryScreen';
import CountryDetailScreen, { screenOptions as CountryDetailScreenOptions } from '../screens/CountryDetailScreen';
import SearchbyContinentScreen, { screenOptions as SearchbyContinentScreenOptions } from '../screens/SearchbyContinentScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import FavouritesScreen, { screenOptions as FavouritesScreenOptions } from '../screens/FavouritesScreen';



const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Colors.primary,


    },
    headerTitleStyle: {
        //   fontFamily: 'open-sans-bold'



    },
    headerBackTitleStyle: {
        //   fontFamily: 'open-sans'
    },
    headerTintColor: 'white',
    headerTitleAlign: 'center'


};

const WorldStackNavigator = createStackNavigator();

export const WorldNavigator = () => {
    return (
        <WorldStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <WorldStackNavigator.Screen
                name='WorldCaseScreen'
                component={WorldCaseScreen}
                options={WorldCaseScreenOptions}
            />

        </WorldStackNavigator.Navigator>
    )
}

const FavouritesStackNavigator = createStackNavigator();

const FavouritesNavigator = () => {
    return (
        <FavouritesStackNavigator.Navigator screenOptions={defaultNavOptions} >
            <FavouritesStackNavigator.Screen
                name='FavouritesScreen'
                component={FavouritesScreen}
                options={FavouritesScreenOptions}
            />
            <CountryStackNavigator.Screen
                name='CountryDetailScreen'
                component={CountryDetailScreen}
                options={CountryDetailScreenOptions}
            />
        </FavouritesStackNavigator.Navigator>
    )
}

const CountryStackNavigator = createStackNavigator();

export const CountryNavigator = () => {
    return (
        <CountryStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <CountryStackNavigator.Screen
                name='SearchbyContinentScreen'
                component={SearchbyContinentScreen}
                options={SearchbyContinentScreenOptions}
            />
            <CountryStackNavigator.Screen
                name='SearchIndividualCountryScreen'
                component={SearchIndividualCountryScreen}
                options={SearchIndividualScreenOptions}
            />

            <CountryStackNavigator.Screen
                name='CountryDetailScreen'
                component={CountryDetailScreen}
                options={CountryDetailScreenOptions}
            />
        </CountryStackNavigator.Navigator>
    )
}



const Tab = createBottomTabNavigator();


export const AppNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Dünya') {
                        iconName = focused
                            ? 'earth'
                            : 'earth-outline';
                    } else if (route.name === 'Arama') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Favoriler') {
                        iconName = focused ? 'star' : 'star-outline'
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: Colors.secondary,
                tabBarActiveBackgroundColor: Colors.primary,
                tabBarInactiveBackgroundColor: Colors.primary,
                tabBarLabelStyle: {
                    fontSize: 10
                },
                headerShown: false,
                ...defaultNavOptions
            })}
        >
            <Tab.Screen name="Dünya" component={WorldNavigator} />
            <Tab.Screen name="Favoriler" component={FavouritesNavigator} />
            <Tab.Screen name="Arama" component={CountryNavigator} />

        </Tab.Navigator>
    );
}



