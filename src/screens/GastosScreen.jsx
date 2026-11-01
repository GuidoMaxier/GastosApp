import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, KeyboardAvoidingView, Alert, ActivityIndicator, } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect, useMemo } from 'react';

//Components
import AjustesModal from '../components/AjustesModal';
import HeaderUsuario from '../components/HeaderUsuario'
import TarjetaBalance from '../components/TarjetaBalance';
import TarjetaGraficoDona from '../components/TarjetaGraficoDona';
import FiltroCategorias from '../components/FiltroCategorias';


import { gastosIniciales } from '../controllers/GastosController';
import { CATEGORIAS_LISTA } from '../constants/categorias';

export default function GastosScreen({ userName, onActualizarNombre, onReiniciarApp }) {
  const insets = useSafeAreaInsets();
  const [gastos, setGastos] = useState(gastosIniciales);
  const [cargando, setCargando] = useState(false); // 
  const [filtroCategoria, setFiltroCategoria] = useState('TODAS');


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

  const donutData = useMemo(() => {
    return CATEGORIAS_LISTA.map((cat) => {
      const totalCat = gastos
        .filter((g) => g.categoria === cat.id)
        .reduce((sum, g) => sum + g.monto, 0);
      return {
        label: cat.label,
        value: totalCat,
        color: cat.color,
      };
    });
  }, [gastos]);

  const gastosFiltrados = useMemo(() => {
    if (filtroCategoria === 'TODAS') return gastos;
    return gastos.filter((g) => g.categoria === filtroCategoria);
  }, [gastos, filtroCategoria]);

  if (cargando) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#4F46E5" />
      </SafeAreaView>
    );
  }

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

          <TarjetaGraficoDona
            data={donutData}
            total={totalGastado}
          />

          <FiltroCategorias
            categorias={CATEGORIAS_LISTA}
            categoriaSeleccionada={filtroCategoria}
            onSeleccionar={setFiltroCategoria}
            gastos={gastosFiltrados}
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
