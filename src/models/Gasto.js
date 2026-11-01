export function crearGasto(descripcion, monto, categoria, fecha) {
  const d = new Date();
  const fechaPorDefecto = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;

  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    descripcion: descripcion.trim(),
    monto: Number(monto),
    categoria: categoria.trim(),
    fecha: fecha && fecha.trim() ? fecha.trim() : fechaPorDefecto,
  };
}

export function validarGasto(descripcion, monto, categoria) {
  if (!descripcion || !descripcion.trim() || !monto || !categoria || !categoria.trim()) {
    return 'Completá todos los campos requeridos.';
  }

  const numMonto = Number(typeof monto === 'string' ? monto.replace(/\./g, '').replace(',', '.') : monto);
  if (!Number.isFinite(numMonto) || numMonto <= 0) {
    return 'Ingresá un monto válido mayor que cero.';
  }

  return null;
}
