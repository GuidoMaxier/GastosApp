import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default function GastosScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Pantalla de Gastos</Text>
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
