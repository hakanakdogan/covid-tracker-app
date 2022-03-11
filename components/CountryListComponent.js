
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import dummyCountries from '../dummyCountries';
import CountryListRenderComponent from './CountryListRenderComponent';
import { getContinentData } from '../store/actions/countryActions';
import Colors from '../constants/Colors';

const CountryListComponent = (props) => {
    const { text, code } = props;
    const [filtered, setfiltered] = useState(continentCountries);
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState(false);
    const countriesReducer = useSelector(state => state.countryReducer)
    const { continentCountries, loading } = countriesReducer;
    const dispatch = useDispatch();




    const loadContinentData = useCallback(async () => {
        setError(false);
        setIsRefreshing(true);
        try {
            await dispatch(getContinentData(code));
            setIsRefreshing(false);
        } catch (error) {
            setError(error.message);

        }
    }, [dispatch, setError, setIsRefreshing])



    useEffect(() => {
        loadContinentData()

    }, [loadContinentData])


    useEffect(() => {
        if (!loading) {
            const filteredDataSource = continentCountries.filter((data) => {
                if (text !== '') {
                    return data.Country.toLowerCase().includes(text.toLowerCase());
                } else {
                    return continentCountries;
                }
            })

            setfiltered(filteredDataSource)
        }




    }, [text, loading, continentCountries])






    const selectCountryHandler = (data) => {
        props.navigation.navigate(
            'CountryDetailScreen',
            {
                data,
                isInit: true

            }

        )

    }

    if (loading || continentCountries?.length === 0) {
        return (
            <View style={[styles.container, styles.horizontal]}>

                <ActivityIndicator size="large" color={Colors.primary} />
            </View>

        )
    } else {

        return (

            <FlatList
                data={filtered}
                renderItem={({ item }) => (

                    <CountryListRenderComponent data={item} onSelect={() => selectCountryHandler(item)} />
                )}

                numColumns={2}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={false}
            />

        );
    }


}

export default CountryListComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }


});