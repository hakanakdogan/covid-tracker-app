import {
    StyleSheet, Text, View, TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const CountryListRenderComponent = (props) => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#16222A', '#3A6073']} style={styles.gradient} >
            <TouchableCmp onPress={props.onSelect} useForeground >
                <View style={styles.container} >
                    <View style={styles.headerContainer}>
                        <Text style={styles.title} >{props.data.Country}</Text>
                    </View>


                </View>
            </TouchableCmp>





        </LinearGradient>
    )
}

export default CountryListRenderComponent

const styles = StyleSheet.create({
    gradient: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 50,
        width: 150,
        marginHorizontal: 5,
        marginVertical: 5


    },
    container: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerContainer: {
        // marginBottom: 20
    },
    title: {
        fontSize: 15,
        color: 'white'
    },

})