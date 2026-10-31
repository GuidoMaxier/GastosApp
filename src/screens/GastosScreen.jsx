import { Text, View } from 'react-native'

export default function GastosScreen({nombre}) {
    return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">Bienvenido {nombre}</Text>
      <Text className="text-xl font-bold text-blue-500">
        Pagina de los gastos
      </Text> 
    </View>
    )
}