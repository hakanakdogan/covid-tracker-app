import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import CaseInfoComp from '../components/CaseInfoComp'
import { useSelector, useDispatch } from 'react-redux'
import { getWorldData } from '../store/actions/countryActions'
import Colors from '../constants/Colors'


const WorldCaseScreen = () => {
    const countriesReducer = useSelector(state => state.countryReducer)
    const { worldData, loading } = countriesReducer;
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const loadWorldData = useCallback(async () => {
        setError(false);
        setIsRefreshing(true);
        try {
            await dispatch(getWorldData());
            setIsRefreshing(false);
        } catch (error) {
            setError(error.message);

        }
    }, [dispatch, setError, setIsRefreshing])



    useEffect(() => {
        loadWorldData()

    }, [loadWorldData])





    if (loading) {
        return (
            <View style={[styles.container, styles.horizontal]}>

                <ActivityIndicator size="large" color={Colors.primary} />
            </View>

        )
    } else if (error) {
        <View style={styles.container} >
            <Text>Bir Hata Oluştu</Text>
            <  Button title='Tekrar deneyin' onPress={() => loadWorldData()} color={Colors.primary} />
        </View>
    }
    else {
        return (
            <FlatList
                onRefresh={loadWorldData}
                refreshing={isRefreshing}
                data={worldData}
                keyExtractor={item => item.header}
                renderItem={itemData => <CaseInfoComp header={itemData.item.header} content={itemData.item.content} color={itemData.item.color} />}
            />
        )
    }

}

export const screenOptions = (navData) => {
    return {
        headerTitle: 'Dünyada Vakalar'
    }
}


export default WorldCaseScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    }
})