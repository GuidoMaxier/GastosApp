import { View, Text } from 'react-native';

export default function TarjetaBalance({ total, cantidadGastos, mayorConsumo }) {
  const formatearMoneda = (val) => {
    return '$' + val.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  return (
    <View className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Balance Total
        </Text>
        <View className="bg-slate-100 px-3 py-1 rounded-full">
          <Text className="text-[11px] font-semibold text-slate-600">
            {cantidadGastos} {cantidadGastos === 1 ? 'gasto' : 'gastos'}
          </Text>
        </View>
      </View>

      <Text className="text-3xl font-black text-slate-900 tracking-tight my-1">
        {formatearMoneda(total)}
      </Text>

      {mayorConsumo && (
        <View className="flex-row items-center justify-between pt-3 mt-3 border-t border-slate-100">
          <Text className="text-xs text-slate-400 font-medium">
            Mayor consumo
          </Text>
          <View className="flex-row items-center bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
            <Text className="text-xs font-bold text-slate-700">
              {mayorConsumo.descripcion} · {formatearMoneda(mayorConsumo.monto)}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
