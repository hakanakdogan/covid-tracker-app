import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, FlatList, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import CountryListComponent from '../components/CountryListComponent';
import SearchComponent from '../components/SearchComponent';
import { useSelector } from 'react-redux';
import Colors from '../constants/Colors';


const SearchIndividualCountryScreen = (props) => {
    const [text, setText] = useState('');
    const code = props.route.params.code
    const getText = (incomingText) => {
        setText(incomingText);
    }
    const countriesReducer = useSelector(state => state.countryReducer)
    const { loading } = countriesReducer;

    if (loading) {
        return (
            <View style={[styles.container, styles.horizontal]}>

                <ActivityIndicator size="large" color={Colors.primary} />
            </View>

        )
    } else {
        return (

            <View>
                <View style={styles.inputContainer} >
                    <SafeAreaView >
                        <ScrollView>
                            <SearchComponent getText={getText} />

                        </ScrollView>


                    </SafeAreaView>
                </View>

                <View style={styles.countriesContainer}>
                    <SafeAreaView style={styles.countriesSafeAreaView}>
                        <CountryListComponent text={text} navigation={props.navigation} code={code} />
                    </SafeAreaView>
                </View>



            </View>
        )
    }



};
export default SearchIndividualCountryScreen;

export const screenOptions = (navData) => {
    return {
        headerTitle: 'Arama'
    }
}


const styles = StyleSheet.create({
    inputContainer: {
        height: '15%'
    },
    countriesContainer: {
        height: '85%',

    },
    countriesSafeAreaView: {

        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }

});