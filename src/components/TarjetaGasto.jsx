import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES_CONFIG } from '../constants/categorias';

export default function TarjetaGasto({ gasto, onEliminar, onEditar }) {
  const configCat = CATEGORIES_CONFIG[gasto.categoria] || CATEGORIES_CONFIG['Otros'];

  return (
    <Pressable
      onPress={onEditar}
      className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-2.5 flex-row items-center justify-between active:bg-slate-50"
      accessibilityLabel={`Gasto ${gasto.descripcion}. Tocar para editar.`}
    >
      
      <View className="flex-row items-center flex-1 mr-3">
        <View
          className="w-11 h-11 rounded-2xl items-center justify-center mr-3"
          style={{ backgroundColor: `${configCat.color}15` }}
        >
          <Ionicons name={configCat.icon} size={20} color={configCat.color} />
        </View>

        <View className="flex-1">
          <Text className="text-base font-bold text-slate-900" numberOfLines={1}>
            {gasto.descripcion}
          </Text>
          <View className="flex-row items-center mt-0.5">
            <Text className="text-xs text-slate-500 font-medium">
              {gasto.categoria}
            </Text>
            {gasto.fecha ? (
              <>
                <Text className="text-xs text-slate-300 mx-1.5">·</Text>
                <Text className="text-xs text-slate-400">
                  {gasto.fecha}
                </Text>
              </>
            ) : null}
          </View>
        </View>
      </View>

      <View className="flex-row items-center">
        <Text className="text-base font-extrabold text-slate-900 mr-2">
          ${gasto.monto.toLocaleString('es-AR')}
        </Text>

        <Pressable
          className="w-8 h-8 rounded-full items-center justify-center active:bg-slate-100"
          onPress={(e) => {
            e.stopPropagation();
            onEliminar();
          }}
          hitSlop={8}
          accessibilityLabel={`Eliminar ${gasto.descripcion}`}
        >
          <Ionicons name="trash-outline" size={16} color="#94A3B8" />
        </Pressable>
      </View>
    </Pressable>
  );
}