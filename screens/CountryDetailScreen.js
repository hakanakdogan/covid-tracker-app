import { StyleSheet, Text, View, Image, ScrollView, Button, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getIndividualCountryData, fetchFavourites, addToFav, removeFromFav } from '../store/actions/countryActions'
import Colors from '../constants/Colors';
import CaseInfoComp from '../components/CaseInfoComp';
import CustomHeaderButton from '../UI/CustomHeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';




const CountryDetailScreen = (props) => {
    const data = props.route.params.data;
    const dispatch = useDispatch();
    const countriesReducer = useSelector(state => state.countryReducer)
    const [error, setError] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [isFavLoading, setisFavLoading] = useState(true);
    const [isInitial, setIsInitial] = useState(props.route.params.isInit);
    const { singleCountry, favouriteCountries, loading } = countriesReducer;

    let favHandlerDispatcher;


    const loadIndividualCountryData = useCallback(async () => {
        setError(false);
        try {
            await dispatch(getIndividualCountryData(data.Country, data.ThreeLetterSymbol));
        } catch (error) {
            setError(true)
        }
    }, [dispatch, setError])



    const loadFavouriteCountries = useCallback(async () => {
        setError(false);
        try {
            await dispatch(fetchFavourites());
        } catch (error) {
            setError(true)
        }
    }, [dispatch, setError])


    useEffect(() => {

        loadIndividualCountryData();



    }, [loadIndividualCountryData])




    useEffect(() => {


        loadFavouriteCountries();



    }, [])

    // isFav ? favHandlerDispatcher = removeFromFav : favHandlerDispatcher = addToFav;

    // const favHandler = async (countryName, countryCode) => {
    //     console.log('favhandler çalıştı');
    //     console.log(favHandlerDispatcher)

    //     try {
    //         setisFavLoading(true);
    //         await dispatch(favHandlerDispatcher(countryName, countryCode));
    //         await loadFavouriteCountries();
    //         setisFavLoading(false);

    //     } catch (error) {
    //         throw error;
    //     }
    // }





    useEffect(() => {



        const favData = favouriteCountries.some((element) => element.countryCode === data.ThreeLetterSymbol)

        setIsFav(favData)

        favData ? favHandlerDispatcher = removeFromFav : favHandlerDispatcher = addToFav;

        const favHandler = async (countryName, countryCode) => {
            console.log('favhandler çalıştı');
            console.log(favHandlerDispatcher)

            try {
                setisFavLoading(true);
                await dispatch(favHandlerDispatcher(countryName, countryCode));
                await loadFavouriteCountries();
                setisFavLoading(false);

            } catch (error) {
                throw error;
            }
        }


        props.navigation.navigate('CountryDetailScreen', { data: data, favHandler: favHandler, isFav: favData, isFavLoading: isFavLoading })

    }, [favouriteCountries])




    if (loading || singleCountry.length === 0) {
        return (
            <View style={[styles.container, styles.horizontal]}>

                <ActivityIndicator size="large" color={Colors.primary} />
            </View>

        )
    } else if (error) {
        return (
            <View style={styles.container} >
                <Text>Bir Hata Oluştu</Text>
                <Button title='Tekrar deneyin' onPress={() => loadIndividualCountryData()} color={Colors.primary} />
            </View>
        )

    } else {

        return (
            <ScrollView>
                <View style={styles.imageContainer}>

                    <Image style={styles.image} source={{ uri: `https://countryflagsapi.com/png/${data.ThreeLetterSymbol}` }} />




                </View>

                {singleCountry.map((data) => {
                    return <CaseInfoComp header={data.header} content={data.content} color={data.color} key={data.header} />
                })}
            </ScrollView>

        )
    }


}

export default CountryDetailScreen

export const screenOptions = (navData) => {
    const favHandler = navData.route.params.favHandler
    const isFav = navData.route.params.isFav
    const favLoading = navData.route.params.favLoading
    console.log('SCREEN OPRIONSA GELEN VERI:', isFav);
    return {
        headerTitle: navData.route.params.data.Country,
        headerRight: () => {
            if (!favLoading) {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton} >
                        <Item title='Favourite' iconName={isFav ? 'star' : 'star-outline'} onPress={() => favHandler(navData.route.params.data.Country, navData.route.params.data.ThreeLetterSymbol)} />
                    </HeaderButtons>
                )
            }

        }
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        alignItems: 'center',

        // borderBottomColor: Colors.primary,
        // borderBottomWidth: 5

    },
    image: {
        width: '100%',
        height: 200,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,

    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
})