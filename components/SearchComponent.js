import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'


const SearchComponent = (props) => {



    return (
        <View style={styles.container} >

            <View style={styles.infoContainer} >
                <Text>Ülke ismi giriniz</Text>
            </View>

            <View style={styles.inputContainer} >
                <TextInput
                    style={styles.input}
                    onChangeText={newText => props.getText(newText)}
                    defaultValue={''}
                />
            </View>






        </View>
    )
}

export default SearchComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 30,
        alignItems: 'center',
        height: 50

    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        height: 40,
        minWidth: 200,
        maxWidth: 200,
        textAlign: 'center'
    }
})