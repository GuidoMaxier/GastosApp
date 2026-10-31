import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GastosScreen from './src/screens/GastosScreen';
import BienvenidaScreen from './src/screens/BienvenidaScreen';
import RegistroScreen from './src/screens/RegistroScreen';


export default function App() {

  const pantalla = "registro" 

  if (pantalla === "bienvenida") {
    return <BienvenidaScreen />
  }

  if (pantalla === "registro") {
    return <RegistroScreen />
  }

  if (pantalla === "gastos") {
    return <GastosScreen />
  }

  return (
    <>
      <BienvenidaScreen />
      <RegistroScreen />
      <GastosScreen />
    </>
  );
}

