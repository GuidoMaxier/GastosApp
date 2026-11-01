import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_GASTOS = 'gastos';

// Ejemplos
export const gastosIniciales = [
  {
    id: '1',
    descripcion: 'Nafta (ejemplo)',
    monto: 20000,
    categoria: 'Transporte',
    fecha: '26/10/2026',
  },
  {
    id: '2',
    descripcion: 'Café (ejemplo)',
    monto: 3500,
    categoria: 'Alimentación',
    fecha: '27/10/2026',
  },
  {
    id: '3',
    descripcion: 'Farmar (ejemplo)',
    monto: 18000,
    categoria: 'Salud',
    fecha: '28/10/2026',
  },
  {
    id: '4',
    descripcion: 'Cine (ejemplo)',
    monto: 12000,
    categoria: 'Entretenimiento',
    fecha: '28/10/2026',
  },
];

export async function obtenerGastos() {
  const datosGuardados = await AsyncStorage.getItem(CLAVE_GASTOS);

  if (datosGuardados !== null) {
    return JSON.parse(datosGuardados);
  }

  await guardarGastos(gastosIniciales);
  return gastosIniciales;
}

export async function guardarGastos(gastos) {
  await AsyncStorage.setItem(CLAVE_GASTOS, JSON.stringify(gastos));
}

export async function restablecerGastos() {
  await AsyncStorage.removeItem(CLAVE_GASTOS);
}