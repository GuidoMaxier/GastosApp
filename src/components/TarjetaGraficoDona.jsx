import { View, Text } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Ionicons } from '@expo/vector-icons';

const ICONOS_CATEGORIA = {
  Alimentación: 'fast-food-outline',
  Transporte: 'car-outline',
  Entretenimiento: 'game-controller-outline',
  Salud: 'medkit-outline',
  Otros: 'receipt-outline',
};

export default function TarjetaGraficoDona({ data, total }) {
  const formatearMonto = (val) => {
    return '$' + val.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const pieData = total === 0
    ? [{ value: 1, color: '#E2E8F0' }]
    : data
        .filter((item) => item.value > 0)
        .map((item) => ({
          value: item.value,
          color: item.color,
        }));

  return (
    <View className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm mb-4">
      <Text className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-3">
        Gasto Total
      </Text>

   
      <View className="flex-row items-center justify-between">
        <View className="w-[140px] h-[140px] items-center justify-center">
          <PieChart
            donut
            innerRadius={46}
            radius={60}
            data={pieData}
            centerLabelComponent={() => (
              <View className="items-center justify-center">
                <Text className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
                  Total
                </Text>
                <Text className="text-xs font-black text-gray-900">
                  {total === 0 ? '$0' : formatearMonto(total)}
                </Text>
              </View>
            )}
          />
        </View>

        <View className="flex-1 pl-4 justify-center space-y-2">
          {data.map((item) => {
            const icono = ICONOS_CATEGORIA[item.label] || 'receipt-outline';
            const porcentaje = total > 0 ? ((item.value / total) * 100).toFixed(0) : '0';

            return (
              <View key={item.label} className="flex-row items-center justify-between py-0.5">
                <View className="flex-row items-center space-x-1.5">
                  <View
                    className="w-6 h-6 rounded-full items-center justify-center mr-1.5"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Ionicons name={icono} size={12} color={item.color} />
                  </View>
                  <Text className="text-xs text-gray-500 font-medium">
                    {porcentaje}%
                  </Text>
                </View>

                <Text className="text-xs font-bold text-gray-900">
                  {formatearMonto(item.value)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
