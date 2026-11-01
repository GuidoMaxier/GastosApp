import { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AjustesModal({
  visible,
  onClose,
  nombreActual,
  onGuardarNombre,
  onReiniciarTodo,
}) {
  const [nombre, setNombre] = useState(nombreActual);

  useEffect(() => {
    setNombre(nombreActual);
  }, [nombreActual, visible]);

  const handleGuardar = () => {
    onGuardarNombre(nombre);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 items-center justify-center p-5">
        <View className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
  
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-900">
              Perfil y Configuración
            </Text>
            <Pressable onPress={onClose} className="p-1 rounded-full active:bg-gray-100">
              <Ionicons name="close" size={22} color="#94A3B8" />
            </Pressable>
          </View>

          <View>

            <View className="mb-4">
              <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Cambiar tu Nombre
              </Text>
              <TextInput
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-900"
                value={nombre}
                onChangeText={setNombre}
                placeholder="Tu nombre"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <Pressable
              className="bg-slate-900 py-3.5 rounded-2xl items-center justify-center active:bg-slate-800 shadow-md mb-5"
              onPress={handleGuardar}
            >
              <Text className="text-white font-bold text-sm">
                Guardar Nombre
              </Text>
            </Pressable>

            <View className="h-[1px] bg-slate-100 mb-4" />

            <Text className="text-xs text-slate-500 leading-relaxed mb-3">
              Si deseas empezar desde cero, podés reiniciar la app y volver a la pantalla de bienvenida.
            </Text>

            <Pressable
              className="border border-red-200/80 bg-red-50/50 py-3 rounded-2xl flex-row items-center justify-center active:bg-red-50"
              onPress={onReiniciarTodo}
            >
              <Ionicons name="refresh" size={16} color="#DC2626" />
              <Text className="text-red-600 font-bold text-xs ml-1.5">
                Reiniciar App por Completo
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
