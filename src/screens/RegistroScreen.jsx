import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';


export default function RegistroScreen({ onGuardarNombre, onVolver }) {
  const [nombre, setNombre] = useState('');

  const handleContinuar = () => {
    const nombreLimpio = nombre.trim();
    if (!nombreLimpio) {
      Alert.alert('Nombre requerido', 'Por favor ingresá tu nombre para continuar.');
      return;
    }
    onGuardarNombre(nombreLimpio);
  };

  const nombreValido = nombre.trim().length > 0;

  return (
    <SafeAreaView className="flex-1 bg-[#FDFBF7]">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <View className="flex-1 justify-between p-6 py-10">
          <View className="mt-2">
          
            <Pressable
              onPress={onVolver}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 items-center justify-center mb-6 active:bg-gray-100"
            >
              <Ionicons name="chevron-back" size={20} color="#334155" />
            </Pressable>

            {/* Título y Subtítulo */}
            <View>
              <Text className="text-2xl font-black text-gray-900 tracking-tight">
                ¿Cómo te llamás?
              </Text>
              <Text className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                Queremos personalizar tu experiencia y tus balances.
              </Text>
            </View>

            <View className="mt-8">
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Tu nombre o apodo
              </Text>
              <TextInput
                className="bg-white border border-gray-200 rounded-2xl px-4 py-3.5 text-base text-gray-900 shadow-sm"
                placeholder="Ej: Hernán"
                value={nombre}
                onChangeText={setNombre}
                autoFocus
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          <View className="px-2">
            <Pressable
              className={`rounded-2xl py-4 flex-row items-center justify-center shadow-md ${
                nombreValido ? 'bg-gray-900 active:bg-gray-800' : 'bg-gray-300'
              }`}
              onPress={handleContinuar}
              disabled={!nombreValido}
            >
              <Text className="text-white font-bold text-base mr-2">
                Continuar
              </Text>
              <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}