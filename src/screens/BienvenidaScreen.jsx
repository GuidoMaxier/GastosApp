import React from 'react'
import { Text, View } from 'react-native'


export default function BienvenidaScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-xl font-bold text-blue-500">
                Bienvenido a Gastos App
            </Text>

            <Text className="mt-12 text-white bg-blue-500 p-5 rounded-full">Comenzar</Text> 
        </View>
    )
}
