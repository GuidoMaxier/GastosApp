import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HeaderUsuario({ userName }) {
  return (
    <View className="flex-row items-center justify-between mb-5 mt-2 px-1">
      <View>
        <Text className="text-[11px] text-stone-500 font-semibold uppercase tracking-widest mb-0.5">
          Bienvenido
        </Text>
        <Text className="text-2xl font-black text-stone-900 tracking-tight">
          Hola, {userName || 'Usuario'}
        </Text>
      </View>

      <Pressable

        className="w-11 h-11 rounded-full bg-white border border-stone-200/80 items-center justify-center shadow-sm active:bg-stone-50"
        accessibilityLabel="Abrir configuración y perfil"
      >
        <Ionicons name="settings-outline" size={19} color="#57534E" />
      </Pressable>
    </View>
  );
}
