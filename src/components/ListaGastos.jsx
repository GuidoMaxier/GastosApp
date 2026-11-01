import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TarjetaGasto from './TarjetaGasto';

export default function ListaGastos({
  gastos,
  onEliminarGasto,
  onEditarGasto,
  onAgregarClick,
}) {
  if (gastos.length === 0) {
    return (
      <View className="py-10 px-4 items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200 my-2">
        <Ionicons name="receipt-outline" size={38} color="#94A3B8" />
        <Text className="text-sm text-gray-400 mt-2 font-medium">
          No hay gastos para mostrar
        </Text>
        {onAgregarClick && (
          <Pressable
            className="mt-3.5 px-4 py-2 rounded-xl border border-indigo-600 active:bg-indigo-50"
            onPress={onAgregarClick}
          >
            <Text className="text-xs font-semibold text-indigo-600">
              Cargar un Gasto
            </Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View>
      {gastos.map((gasto) => (
        <TarjetaGasto
          key={gasto.id}
          gasto={gasto}
          onEliminar={() => onEliminarGasto(gasto.id, gasto.descripcion)}
          onEditar={() => onEditarGasto(gasto)}
        />
      ))}
    </View>
  );
}
