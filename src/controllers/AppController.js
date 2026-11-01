import { restablecerUsuario } from '../repositories/UsuarioRepository';

export async function reiniciarTodaLaApp() {
  await Promise.all([
    restablecerUsuario(),
  ]);
}
