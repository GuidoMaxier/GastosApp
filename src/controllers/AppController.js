import { restablecerUsuario } from '../repositories/UsuarioRepository';
import { restablecerGastos } from '../repositories/GastosRepository';

export async function reiniciarTodaLaApp() {
  await Promise.all([
    restablecerUsuario(),
    restablecerGastos(),
  ]);
}
