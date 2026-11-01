import {
  obtenerNombreUsuario,
  guardarNombreUsuario,
} from '../repositories/UsuarioRepository';

export async function guardarUsuario(nombre) {
  await guardarNombreUsuario(nombre.trim());
}

export async function cargarUsuario() {
  return await obtenerNombreUsuario();
}

