import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CountryDetailScreen = (props) => {
    const name = props.route.params.name;

    return (
        <View>
            <Text>Bu {name} in sayfası</Text>
        </View>
    )
}

export default CountryDetailScreen

export const screenOptions = (navData) => {
    return {
        headerTitle: navData.route.params.name
    }
}

const styles = StyleSheet.create({})