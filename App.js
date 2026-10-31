import React, { useState } from 'react';
import { View, Text } from 'react-native';
import GastosScreen from './src/screens/GastosScreen';
import BienvenidaScreen from './src/screens/BienvenidaScreen';
import RegistroScreen from './src/screens/RegistroScreen';
import "./global.css";


export default function App() {

  const [screen, setScreen] = useState('bienvenida')
  const [nombre, setNombre] = useState('Anonimo')

  function onScreen(screen) {
    setScreen(screen)
  }

return (
  <>

    {screen === 'cargando' && (
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold">Cargando...</Text>
      </View>
    )}

    {screen === 'bienvenida' && 
    <BienvenidaScreen onScreen={onScreen} />}
    
    {screen === 'registro' && 
    <RegistroScreen onScreen={onScreen} />}
    
    {screen === 'gastos' && 
    <GastosScreen nombre={nombre}/>}

  </>
);

}
