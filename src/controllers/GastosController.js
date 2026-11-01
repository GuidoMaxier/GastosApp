import {
  gastosIniciales,
  obtenerGastos,
  guardarGastos,
} from '../repositories/GastosRepository';

export { gastosIniciales };

import {
  crearGasto,
  validarGasto,
} from '../models/Gasto';

export async function cargarGastos() {
  return await obtenerGastos();
}

