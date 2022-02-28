import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const CaseInfoComp = (props) => {

    return (

        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#16222A', '#3A6073']} style={styles.gradient} >

            <View style={styles.container} >
                <View style={styles.headerContainer}>
                    <Text style={styles.title} >{props.header}</Text>
                </View>

                <View style={styles.contentContainer} >
                    <Text style={{ ...styles.content, color: props.color }}>{props.content}</Text>
                </View>
            </View>




        </LinearGradient>
    )
}

export default CaseInfoComp

const styles = StyleSheet.create({
    gradient: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 150,
        marginHorizontal: 20,
        marginVertical: 10


    },
    container: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerContainer: {
        marginBottom: 20
    },
    title: {
        fontSize: 25,
        color: 'white'
    },
    content: {
        fontSize: 20,

    }

})