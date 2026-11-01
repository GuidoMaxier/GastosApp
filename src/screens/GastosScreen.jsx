import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect, useMemo } from 'react';

//Components
import AjustesModal from '../components/AjustesModal';
import HeaderUsuario from '../components/HeaderUsuario'
import TarjetaBalance from '../components/TarjetaBalance';

import { gastosIniciales } from '../controllers/GastosController';

export default function GastosScreen({ userName, onActualizarNombre, onReiniciarApp }) {
  const insets = useSafeAreaInsets();
  const [gastos, setGastos] = useState(gastosIniciales);


  // Ajustes usuario
  const [profileModalVisible, setProfileModalVisible] = useState(false);



  // Funciones Ajustes usuario
  const handleActualizarNombreModal = async (nuevoNombre) => {
    if (onActualizarNombre) {
      await onActualizarNombre(nuevoNombre);
    }
    setProfileModalVisible(false);
  };

  const handleReiniciarTodo = () => {
    Alert.alert(
      'Reiniciar App',
      '¿Estás seguro? Se borrarán todos los gastos y tu nombre guardado.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, reiniciar',
          style: 'destructive',
          onPress: async () => {
            setProfileModalVisible(false);
            if (onReiniciarApp) {
              await onReiniciarApp();
            }
          },
        },
      ]
    );
  };

  const totalGastado = useMemo(() => {
    return gastos.reduce((sum, item) => sum + item.monto, 0);
  }, [gastos]);

  const gastoMasAlto = useMemo(() => {
    if (gastos.length === 0) return null;
    return gastos.reduce((max, item) => (item.monto > max.monto ? item : max), gastos[0]);
  }, [gastos]);


  return (
    <SafeAreaView className="flex-1 bg-[#F7E7CE]" edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 18,
            paddingBottom: Math.max(insets.bottom + 90, 110),
            paddingTop: 16,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <HeaderUsuario
            userName={userName}
            onAbrirAjustes={() => setProfileModalVisible(true)}
          />

          <TarjetaBalance
            total={totalGastado}
            cantidadGastos={gastos.length}
            mayorConsumo={gastoMasAlto}
          />

        </ScrollView>
      </KeyboardAvoidingView>

      <AjustesModal
        visible={profileModalVisible}
        onClose={() => setProfileModalVisible(false)}
        nombreActual={userName}
        onGuardarNombre={handleActualizarNombreModal}
        onReiniciarTodo={handleReiniciarTodo}
      />
    </SafeAreaView>
  );
}
