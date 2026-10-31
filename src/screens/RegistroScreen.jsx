import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function RegistroScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Pantalla de Registro</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    texto: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'black', 
        marginTop: 200,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
