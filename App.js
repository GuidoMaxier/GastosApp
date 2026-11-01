import "./global.css";
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Los controllers
import {
  guardarUsuario,
  cargarUsuario,
} from './src/controllers/UsuarioController';

import { reiniciarTodaLaApp } from './src/controllers/AppController';



//Las pantallas
import GastosScreen from './src/screens/GastosScreen';
import BienvenidaScreen from './src/screens/BienvenidaScreen';
import RegistroScreen from './src/screens/RegistroScreen';

export default function App() {
  const [screen, setScreen] = useState('cargando');
  const [userName, setUserName] = useState('');

  const handleGuardarNombre = async (nombreIngresado) => {
    const nombreLimpio = (nombreIngresado || '').trim();
    if (!nombreLimpio) {
      Alert.alert('Nombre requerido', 'Por favor ingresá tu nombre para continuar.');
      return;
    }
    await guardarUsuario(nombreLimpio);
    // console.log("Nombre guardado:", nombreLimpio);
    setUserName(nombreLimpio);
    setScreen('gastos');
  };

  useEffect(() => {
    async function inicializarSesion() {
      try {
        const usuarioGuardado = await cargarUsuario();
        if (usuarioGuardado) {
          setUserName(usuarioGuardado);
          setScreen('gastos');
        } else {
          setScreen('bienvenida');
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la información del usuario.');
        setScreen('bienvenida');
      }
    }

    inicializarSesion();
  }, []);

  const handleActualizarNombre = async (nuevoNombre) => {
    const nombreLimpio = (nuevoNombre || '').trim();
    if (!nombreLimpio) {
      Alert.alert('Nombre inválido', 'El nombre no puede estar vacío.');
      return;
    }
    await guardarUsuario(nombreLimpio);
    setUserName(nombreLimpio);
  };

  const handleReiniciarApp = async () => {
    await reiniciarTodaLaApp();
    setUserName('');
    setScreen('bienvenida');
  };


  return (
    <SafeAreaProvider>

      {screen === 'cargando' && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-xl font-bold">Cargando...</Text>
        </View>
      )}

      {screen === 'bienvenida' &&
        <BienvenidaScreen onComenzar={() => setScreen("registro")} />}

      {screen === 'registro' &&
        <RegistroScreen
          onGuardarNombre={handleGuardarNombre}
          onVolver={() => setScreen("bienvenida")} />}

      {screen === 'gastos' &&
        <GastosScreen
          userName={userName}
          onActualizarNombre={handleActualizarNombre}
          onReiniciarApp={handleReiniciarApp}

        />}

    </SafeAreaProvider>
  );

}
