import {
    StyleSheet, Text, View, TouchableOpacity,
    TouchableNativeFeedback, Platform
} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const ContinentComponent = (props) => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }



    return (

        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#16222A', '#3A6073']} style={styles.gradient} >
            <TouchableCmp onPress={props.onPressHandler} >
                <View style={styles.container} >
                    <View style={styles.continentContainer}>
                        <Text style={styles.continent} >{props.continent}</Text>
                    </View>
                </View>
            </TouchableCmp>





        </LinearGradient>
    )
}

export default ContinentComponent

const styles = StyleSheet.create({
    gradient: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 100,
        marginHorizontal: 20,
        marginVertical: 10


    },
    container: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    continentContainer: {
        marginBottom: 20
    },
    continent: {
        fontSize: 20,
        color: 'white'
    }

})