import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TarjetaGasto from './TarjetaGasto';

export default function ListaGastos({
  gastos,
}) {
  if (gastos.length === 0) {
    return (
      <View className="py-10 px-4 items-center justify-center bg-white rounded-3xl border border-dashed border-gray-200 my-2">
        <Ionicons name="receipt-outline" size={38} color="#94A3B8" />
        <Text className="text-sm text-gray-400 mt-2 font-medium">
          No hay gastos para mostrar
        </Text>
      </View>
    );
  }

  return (
    <View>
      {gastos.map((gasto) => (
        <TarjetaGasto
          key={gasto.id}
          gasto={gasto}
        />
      ))}
    </View>
  );
}
