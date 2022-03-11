// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const FavouritesScreen = () => {
//     return (
//         <View>
//             <Text>FavouritesScreen</Text>
//         </View>
//     )
// }

// export default FavouritesScreen

// export const screenOptions = (navData) => {
//     return {
//         headerTitle: 'Favori Ülkeler'
//     }
// }

// const styles = StyleSheet.create({})


import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import CountryListRenderComponent from '../components/CountryListRenderComponent';
import { fetchFavourites } from '../store/actions/countryActions';
import Colors from '../constants/Colors';

const FavouritesScreen = (props) => {
    const [error, setError] = useState();
    const countriesReducer = useSelector(state => state.countryReducer)
    const { favouriteCountries, loading } = countriesReducer;
    const dispatch = useDispatch();
    let data = [];


    const loadFavourites = useCallback(async () => {
        setError(false);

        try {
            await dispatch(fetchFavourites());

        } catch (error) {
            setError(error.message);

        }
    }, [dispatch, setError])

    useEffect(() => {
        loadFavourites();


    }, [])


    favouriteCountries.forEach((item) => {
        data.push({
            Country: item.countryName,
            ThreeLetterSymbol: item.countryCode
        })
    })

    const selectCountryHandler = (data) => {
        props.navigation.navigate(
            'CountryDetailScreen',
            {
                data,
                isInit: true

            }

        )

    }


    if (loading) {
        return (
            <View style={[styles.container, styles.horizontal]}>

                <ActivityIndicator size="large" color={Colors.primary} />
            </View>

        )
    }
    else if (favouriteCountries.length === 0) {
        return (
            <View style={styles.textContainer} >
                <Text>Hiç favori ülke yok, bir ülke sayfasından eklemeyi deneyin.</Text>
            </View>
        )
    }
    else {
        return (
            <View style={styles.listContainer}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (

                        <CountryListRenderComponent data={item} onSelect={() => selectCountryHandler(item)} />
                    )}

                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                />
            </View>



        );
    }


}

export default FavouritesScreen

export const screenOptions = (navData) => {
    return {
        headerTitle: 'Favori Ülkeler'
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }


});