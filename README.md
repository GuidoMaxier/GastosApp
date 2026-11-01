<p align="center">
  <img src="./assets/logo_upateco.png" alt="UPATECO Logo" />
</p>

# Trabajo Práctico: Desarrollo de Aplicación Móvil - GastosApp

**Institución:** Universidad Provincial de Administración, Tecnología y Oficios (UPATECO)  
**Carrera:** Tecnicatura Universitaria en Programación con orientación en desarrollo de Aplicaciones  
**Materia:** PROGRAMACIÓN MÓVIL II - 2026  
**Docente:** Francisco Bruno Geronimo  

---

Aplicación móvil desarrollada con **React Native** y **Expo**; cumple con los objetivos prácticos de la cursada.

---

## Capturas de la Aplicación

<div align="center">
  <img src="./assets/Captura%20de%20pantalla/Pantalla%20de%20Bienvenida.jpeg" width="30%" alt="Bienvenida" />
  <img src="./assets/Captura%20de%20pantalla/Pantalla%20de%20Registro.jpeg" width="30%" alt="Registro" />
  <img src="./assets/Captura%20de%20pantalla/Pantalla%20Gastos.jpeg" width="30%" alt="Gastos" />
</div>

<div align="center" style="margin-top: 10px;">
  <img src="./assets/Captura%20de%20pantalla/Agregar%20Gasto.jpeg" width="22%" alt="Agregar" />
  <img src="./assets/Captura%20de%20pantalla/Editar%20Gasto.jpeg" width="22%" alt="Editar" />
  <img src="./assets/Captura%20de%20pantalla/Eliminar%20Gasto.jpeg" width="22%" alt="Eliminar" />
  <img src="./assets/Captura%20de%20pantalla/Ajuste.jpeg" width="22%" alt="Ajustes" />
</div>

---

## Librerías de Estilos y Componentes Utilizadas

Para agilizar el desarrollo, garantizar un diseño limpio y mejorar la experiencia de usuario se integraron:

* **Estilos & UI:** **NativeWind (Tailwind CSS v3)** — Permite maquetar rápidamente con clases utilitarias (`className`), manteniendo un sistema de diseño consistente, moderno y responsivo.
* **Íconos:** **@expo/vector-icons (Ionicons)** — Iconografía vectorial nativa para botones de acción, categorías y navegación.
* **Visualización de Datos:** **react-native-gifted-charts** — Componente de gráficos interactivos (gráfico de dona) para representar porcentajes y gastos por categoría en tiempo real.
* **Manejo de Fechas:** **@react-native-community/datetimepicker** — Selector de calendario nativo para registrar la fecha exacta del gasto.
* **Degradados & Layout:** **expo-linear-gradient** y **react-native-safe-area-context** — En pantalla de bienvenida y adaptación a notch / barras de estado.
* **Inspiración de Diseño:** Inspirado conceptualmente en interfaces de [Dribbble - Expense App](https://dribbble.com/search/expense-app) (sin replicar un diseño en particular).

---

## Funcionalidades Principales

* **Onboarding & Registro:** Pantalla de bienvenida e ingreso del nombre del usuario.
* **Dashboard y Métricas:**
  * Balance total acumulado y mayor gasto realizado.
  * Gráfico de dona con la distribución visual de gastos por categoría.
* **Gestión de Gastos (CRUD):**
  * **Agregar:** Botón flotante (+) con formulario modal (descripción, monto, categoría y fecha).
  * **Editar:** Al presionar cualquier tarjeta de gasto, se abre el formulario con sus datos precargados para modificarlos.
  * **Eliminar:** Botón directo en la tarjeta con confirmación mediante alerta (`Alert.alert`).
* **Filtrado por Categorías:** Barra horizontal para filtrar el listado o ver todos.
* **Ajustes y Reinicio:** Modal para modificar el nombre o reiniciar la app borrando los datos para empezar de cero.
  > **Nota de visualización en Expo Go (Android):** El botón de ajustes (ícono de engranaje superior) se encuentra en la esquina derecha del encabezado. Puede coincidir con la barra flotante de Expo Go.

---

## Conceptos de la Cursada Aplicados

* **`useState` / `useEffect`:** Control de pantallas, modales, formularios y carga inicial persistida.
* **`useMemo`:** Cálculos del balance total, gasto máximo y filtrado de listas (Mas Rapido).
* **`TextInput` / `Pressable`:** Entradas de texto validadas y botones.
* **`map()` / `.filter()` / `.reduce()`:** Renderizado de listas, filtrado por categorías y suma de importes.
* **Renderizado condicional:** Transiciones entre pantallas..
* **Manejo local (sin Backend):** Persistencia en el dispositivo mediante `@react-native-async-storage/async-storage`.

---

## Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor Expo:**
   ```bash
   npx expo start
   ```

3. **Probar en dispositivo:** Escanear el código QR desde la app **Expo Go** (Android/iOS).
