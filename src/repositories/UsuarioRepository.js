import AsyncStorage from '@react-native-async-storage/async-storage';


const CLAVE_USUARIO = 'usuario';

export async function obtenerNombreUsuario() {
  return await AsyncStorage.getItem(CLAVE_USUARIO);
}

export async function guardarNombreUsuario(nombre) {
  await AsyncStorage.setItem(CLAVE_USUARIO, nombre);
}

export async function restablecerUsuario() {
  await AsyncStorage.removeItem(CLAVE_USUARIO);
}