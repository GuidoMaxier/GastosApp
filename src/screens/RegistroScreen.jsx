import { Text, View } from 'react-native'

export default function RegistroScreen({onScreen}) {
  
    function handleRegistrarse() {
        onScreen('gastos')
    }

    return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Pagina del registro
      </Text>

      <Text onPress={handleRegistrarse} className="mt-12 text-white bg-blue-500 p-5 rounded-full">Guardar</Text>
    </View>
    )
}
