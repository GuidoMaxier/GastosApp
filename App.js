import React, { useState } from 'react';
import { View, Text } from 'react-native';
import GastosScreen from './src/screens/GastosScreen';
import BienvenidaScreen from './src/screens/BienvenidaScreen';
import RegistroScreen from './src/screens/RegistroScreen';
import "./global.css";


import {
  guardarUsuario,
} from './src/controllers/UsuarioController';


export default function App() {
  const [screen, setScreen] = useState('bienvenida');
  const [userName, setUserName] = useState('');


  const handleGuardarNombre = async (nombreIngresado) => {
    const nombreLimpio = (nombreIngresado || '').trim();
    if (!nombreLimpio) {
      Alert.alert('Nombre requerido', 'Por favor ingresá tu nombre para continuar.');
      return;
    }
    await guardarUsuario(nombreLimpio);
    console.log("Nombre guardado:", nombreLimpio);
    setUserName(nombreLimpio);
    setScreen('gastos');
  };


  return (
    <>

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
        <GastosScreen nombre={userName} />}

    </>
  );

}
