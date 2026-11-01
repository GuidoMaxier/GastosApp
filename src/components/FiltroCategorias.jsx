import { View, Text, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FiltroCategorias({
  categorias = [],
  categoriaSeleccionada,
  onSeleccionar,
  gastos = [],
}) {
  return (
    <View className="mb-3">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-bold text-gray-900">
          Historial de Gastos
        </Text>
        <Text className="text-xs text-gray-400 font-medium">
          {gastos.length} en pantalla
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row py-1">
          {/* Opción 'Todas' */}
          <Pressable
            onPress={() => onSeleccionar('TODAS')}
            className={`px-3.5 py-1.5 rounded-full mr-2 ${categoriaSeleccionada === 'TODAS' ? 'bg-gray-900' : 'bg-gray-100'
              }`}
          >
            <Text
              className={`text-xs ${categoriaSeleccionada === 'TODAS'
                ? 'text-white font-bold'
                : 'text-gray-600'
                }`}
            >
              Todas
            </Text>
          </Pressable>

          {/* Categorías individuales */}
          {categorias.map((cat) => {
            const isSelected = categoriaSeleccionada === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => onSeleccionar(cat.id)}
                className={`px-3.5 flex flex-row items-center py-1.5 rounded-full mr-2 ${isSelected ? 'bg-gray-900' : 'bg-gray-100'
                  }`}
              >
                {cat.icon && (
                  <Ionicons
                    name={cat.icon}
                    size={14}
                    color={isSelected ? '#FFFFFF' : '#475569'}
                    style={{ marginRight: 5 }}
                  />
                  )}
                <Text
                  className={`text-xs ${isSelected ? 'text-white font-bold' : 'text-gray-600'
                    }`}
                >
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
