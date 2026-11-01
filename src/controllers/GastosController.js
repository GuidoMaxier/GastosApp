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

export async function agregarGasto(
  gastosActuales,
  descripcion,
  monto,
  categoria,
  fecha
) {

  const error = validarGasto(descripcion, monto, categoria);
  if (error) {
    throw new Error(error);
  }

  const numMonto = Number(typeof monto === 'string' ? monto.replace(/\./g, '').replace(',', '.') : monto);
  const nuevoGasto = crearGasto(descripcion, numMonto, categoria, fecha);
  const nuevosGastos = [nuevoGasto, ...gastosActuales];

  await guardarGastos(nuevosGastos);
  return nuevosGastos;
}

export async function editarGasto(
  gastosActuales,
  id,
  descripcion,
  monto,
  categoria,
  fecha
) {

  const error = validarGasto(descripcion, monto, categoria);
  if (error) {
    throw new Error(error);
  }

  const numMonto = Number(typeof monto === 'string' ? monto.replace(/\./g, '').replace(',', '.') : monto);
  const nuevosGastos = gastosActuales.map((gasto) =>
    gasto.id === id
      ? {
          ...gasto,
          descripcion: descripcion.trim(),
          monto: numMonto,
          categoria: categoria.trim(),
          fecha: fecha || gasto.fecha,
        }
      : gasto
  );

  await guardarGastos(nuevosGastos);
  return nuevosGastos;
}

export async function eliminarGasto(gastosActuales, id) {
  const nuevosGastos = gastosActuales.filter((gasto) => gasto.id !== id);
  await guardarGastos(nuevosGastos);
  return nuevosGastos;
}
