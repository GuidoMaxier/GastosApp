import { useState, useEffect, useMemo } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  View,
  Pressable,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import {
  cargarGastos,
  agregarGasto,
  editarGasto,
  eliminarGasto,
} from '../controllers/GastosController';

// Componentes
import HeaderUsuario from '../components/HeaderUsuario';
import TarjetaBalance from '../components/TarjetaBalance';
import TarjetaGraficoDona from '../components/TarjetaGraficoDona';
import FiltroCategorias from '../components/FiltroCategorias';
import ListaGastos from '../components/ListaGastos';
import FormularioGastoModal from '../components/FormularioGastoModal';
import { CATEGORIAS_LISTA } from '../constants/categorias';
import AjustesModal from '../components/AjustesModal';

export default function GastosScreen({ userName, onActualizarNombre, onReiniciarApp }) {
  const insets = useSafeAreaInsets();
  const [gastos, setGastos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState('TODAS');

  // Formulario Gasto
  const [modalVisible, setModalVisible] = useState(false);
  const [editingGastoId, setEditingGastoId] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('Alimentación');
  const [fecha, setFecha] = useState('');
  const [guardando, setGuardando] = useState(false);

  // Ajuste
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const getFechaHoy = () => {
    const d = new Date();
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}/${d.getFullYear()}`;
  };

  useEffect(() => {
    async function iniciar() {
      try {
        const gastosGuardados = await cargarGastos();
        setGastos(gastosGuardados);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron inicializar los gastos.');
      } finally {
        setCargando(false);
      }
    }

    iniciar();
  }, []);

  const handleActualizarNombreModal = async (nuevoNombre) => {
    if (onActualizarNombre) {
      await onActualizarNombre(nuevoNombre);
    }
    setProfileModalVisible(false);
  };

  const handleOpenCrear = () => {
    setEditingGastoId(null);
    setDescripcion('');
    setMonto('');
    setCategoria('Alimentación');
    setFecha(getFechaHoy());
    setModalVisible(true);
  };

  const handleOpenEditar = (gasto) => {
    setEditingGastoId(gasto.id);
    setDescripcion(gasto.descripcion);
    setMonto(String(gasto.monto));
    setCategoria(gasto.categoria);
    setFecha(gasto.fecha || getFechaHoy());
    setModalVisible(true);
  };

  const handleGuardarFormulario = async () => {
    if (guardando) return;

    try {
      setGuardando(true);
      if (editingGastoId) {
        const nuevos = await editarGasto(
          gastos,
          editingGastoId,
          descripcion,
          monto,
          categoria,
          fecha
        );
        setGastos(nuevos);
      } else {
        const nuevos = await agregarGasto(
          gastos,
          descripcion,
          monto,
          categoria,
          fecha
        );
        setGastos(nuevos);
      }
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Atención', error.message || 'Error al guardar el gasto.');
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = (id, desc) => {
    Alert.alert(
      'Eliminar gasto',
      `¿Deseas eliminar "${desc}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const nuevos = await eliminarGasto(gastos, id);
              setGastos(nuevos);
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el gasto.');
            }
          },
        },
      ]
    );
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
            setGastos([]);
            if (onReiniciarApp) {
              await onReiniciarApp();
            }
          },
        },
      ]
    );
  };

  // Para para la componente dona etc
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

          <ListaGastos
            gastos={gastosFiltrados}
            onEliminarGasto={handleEliminar}
            onEditarGasto={handleOpenEditar}
            onAgregarClick={handleOpenCrear}
          />
        </ScrollView>

        <View
          className="absolute right-5"
          style={{ bottom: Math.max(insets.bottom + 16, 28) }}
        >
          <Pressable
            className="bg-stone-900 rounded-full items-center justify-center shadow-lg active:bg-stone-800"
            style={{ width: 60, height: 60 }}
            onPress={handleOpenCrear}
            accessibilityLabel="Agregar nuevo gasto"
          >
            <Ionicons name="add" size={36} color="#FFFFFF" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <FormularioGastoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        monto={monto}
        setMonto={setMonto}
        categoria={categoria}
        setCategoria={setCategoria}
        fecha={fecha}
        setFecha={setFecha}
        onGuardar={handleGuardarFormulario}
        modoEdicion={editingGastoId !== null}
        guardando={guardando}
      />

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
