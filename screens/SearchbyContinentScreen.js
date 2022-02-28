import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import ContinentComponent from '../components/ContinentComponent'

const SearchbyContinentScreen = (props) => {
    const continentData = [
        {
            continent: 'Asya',
            code: 'asia'
        },
        {
            continent: 'Afrika',
            code: 'africa'
        },
        {
            continent: 'Avrupa',
            code: 'europe'
        },
        {
            continent: 'Kuzey Amerika',
            code: 'northamerica'
        },
        {
            continent: 'Güney Amerika',
            code: 'southamerica'
        },
        {
            continent: 'Avustralya ve Okyanusya',
            code: 'australia'
        }
    ]

    const selectCountryHandler = (code) => {
        props.navigation.navigate(
            'SearchIndividualCountryScreen',
            {
                code: code
            }

        )

    }
    return (
        <FlatList

            data={continentData}
            keyExtractor={item => item.code}
            renderItem={itemData => <ContinentComponent continent={itemData.item.continent} code={itemData.item.code} onPressHandler={() => selectCountryHandler(itemData.item.code)} />}

            showsVerticalScrollIndicator={false}
        />
    )
}

export default SearchbyContinentScreen

export const screenOptions = (navData) => {
    return {
        headerTitle: 'Bölge Seçin'
    }
}

const styles = StyleSheet.create({})