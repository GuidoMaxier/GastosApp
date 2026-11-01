import { useState } from 'react';
import {
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {CATEGORIAS_LISTA} from '../constants/categorias'; 


export default function FormularioGastoModal({
  visible,
  onClose,
  descripcion,
  setDescripcion,
  monto,
  setMonto,
  categoria,
  setCategoria,
  fecha,
  setFecha,
  onGuardar,
  modoEdicion,
  guardando,
}) {
  const [mostrarPicker, setMostrarPicker] = useState(false);

  const parseFecha = (strFecha) => {
    if (!strFecha) return new Date();
    const partes = strFecha.split('/');
    if (partes.length === 3) {
      const dia = parseInt(partes[0], 10);
      const mes = parseInt(partes[1], 10) - 1;
      const anio = parseInt(partes[2], 10);
      return new Date(anio, mes, dia);
    }
    return new Date();
  };

  const onFechaChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setMostrarPicker(false);
    }
    if (selectedDate) {
      const dia = String(selectedDate.getDate()).padStart(2, '0');
      const mes = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const anio = selectedDate.getFullYear();
      setFecha(`${dia}/${mes}/${anio}`);
    }
  };

  const handleMontoChange = (texto) => {
    const soloNumerosYPunto = texto.replace(/[^0-9.,]/g, '');
    setMonto(soloNumerosYPunto);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 bg-black/40 justify-end"
      >
        <View className="bg-white rounded-t-[32px] p-6 pb-10 shadow-xl">

          <View className="flex-row items-center justify-between mb-5">
            <Text className="text-xl font-bold text-gray-900">
              {modoEdicion ? 'Editar Gasto' : 'Nuevo Gasto'}
            </Text>
            <Pressable p-1 onPress={onClose} className="rounded-full active:bg-gray-100 p-1">
              <Ionicons name="close-circle-outline" size={26} color="#94A3B8" />
            </Pressable>
          </View>

          <View>

            <View className="mb-4">
              <Text className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Descripción
              </Text>
              <TextInput
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-900"
                placeholder="Ej: Supermercado, Nafta, Café"
                placeholderTextColor="#94A3B8"
                value={descripcion}
                onChangeText={setDescripcion}
              />
            </View>

            <View className="flex-row mb-4">
              <View className="flex-1 mr-3">
                <Text className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  Monto ($)
                </Text>
                <TextInput
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm text-slate-900"
                  placeholder="Ej: 15000"
                  placeholderTextColor="#94A3B8"
                  value={monto}
                  onChangeText={handleMontoChange}
                  keyboardType="decimal-pad"
                />
              </View>

              <View className="flex-1">
                <Text className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                  Fecha
                </Text>
                <Pressable
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 flex-row items-center justify-between active:bg-slate-100"
                  onPress={() => setMostrarPicker(true)}
                >
                  <Text className="text-sm font-medium text-slate-800">
                    {fecha || 'Seleccionar'}
                  </Text>
                  <Ionicons name="calendar-outline" size={17} color="#64748B" />
                </Pressable>
              </View>
            </View>

            {mostrarPicker && (
              <DateTimePicker
                value={parseFecha(fecha)}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onFechaChange}
                maximumDate={new Date(2030, 11, 31)}
              />
            )}

            <View className="mb-5">
              <Text className="text-xs font-bold text-slate-500 mb-2.5 uppercase tracking-wider">
                Categoría
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row py-1">
                  {CATEGORIAS_LISTA.map((cat) => {
                    const isSelected = categoria === cat.id;
                    return (
                      <Pressable
                        key={cat.id}
                        onPress={() => setCategoria(cat.id)}
                        className={`px-3.5 py-2 rounded-full flex-row items-center mr-2 border ${
                          isSelected
                            ? 'bg-slate-900 border-slate-900'
                            : 'bg-slate-100 border-transparent active:bg-slate-200'
                        }`}
                      >
                        <Ionicons
                          name={cat.icon}
                          size={14}
                          color={isSelected ? '#FFFFFF' : '#475569'}
                        />
                        <Text
                          className={`text-xs ml-1.5 ${
                            isSelected ? 'text-white font-bold' : 'text-slate-700 font-medium'
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

            <Pressable
              className={`bg-slate-900 py-4 rounded-2xl flex-row items-center justify-center mt-2 shadow-lg active:bg-slate-800 ${
                guardando ? 'opacity-60' : ''
              }`}
              onPress={onGuardar}
              disabled={guardando}
            >
              <Ionicons
                name={modoEdicion ? 'checkmark-circle' : 'add-circle'}
                size={18}
                color="#FFFFFF"
              />
              <Text className="text-white font-bold text-base ml-2">
                {modoEdicion ? 'Guardar Cambios' : 'Agregar Gasto'}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
