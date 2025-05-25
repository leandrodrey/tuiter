# Tuiter App

## 📱 Acerca de Tuiter

Tuiter es una aplicación web moderna inspirada en Twitter que permite a los usuarios compartir mensajes cortos, interactuar con publicaciones de otros usuarios y gestionar su perfil personal. Diseñada con un enfoque en la experiencia de usuario, Tuiter ofrece una interfaz intuitiva y responsive para la comunicación social.

## ✨ Características Principales

* **Autenticación de Usuarios**: Registro, inicio de sesión y gestión de perfil
* **Feed de Publicaciones**: Visualización de publicaciones con scroll infinito
* **Creación de Publicaciones**: Editor para crear nuevos posts
* **Interacciones Sociales**: Posibilidad de dar "me gusta" y responder a publicaciones
* **Favoritos**: Guardar usuarios favoritos para acceso rápido
* **Borradores**: Guardar borradores de publicaciones para continuar más tarde
* **Diseño Responsive**: Adaptable a dispositivos móviles y de escritorio

## 🛠️ Tecnologías Utilizadas

Tuiter está construida con el siguiente stack tecnológico:

* **Frontend:** React 19 con TypeScript para un desarrollo tipado y robusto
* **Routing:** React Router para la navegación entre páginas
* **Estilos:** TailwindCSS para un diseño responsive y moderno
* **Formularios:** Formik con Yup para la gestión y validación de formularios
* **Peticiones HTTP:** Axios para la comunicación con la API
* **Estado:** React Context API para la gestión del estado global
* **Notificaciones:** React Toastify para mensajes de feedback al usuario
* **Scroll Infinito:** React Infinite Scroll Component para cargar contenido dinámicamente

## 🏗️ Arquitectura y Organización

El proyecto sigue una estructura organizada y modular:

* **`/components`**: Componentes reutilizables organizados por dominio (Post, LoginForm, etc.)
* **`/pages`**: Componentes de página completa para cada ruta
* **`/layouts`**: Componentes de estructura que definen la disposición visual de la aplicación
* **`/context`**: Proveedores de contexto para la gestión del estado global
* **`/hooks`**: Hooks personalizados para lógica reutilizable
* **`/services`**: Funciones para la comunicación con la API
* **`/utils`**: Funciones utilitarias
* **`/types`**: Definiciones de tipos TypeScript
* **`/validations`**: Esquemas de validación para formularios
* **`/configs`**: Archivos de configuración de la aplicación, como endpoints de API y tokens
* **`/constants`**: Constantes y valores predefinidos utilizados en toda la aplicación
* **`/routes`**: Definiciones de rutas y componentes relacionados con la navegación
* **`/assets`**: Recursos estáticos como imágenes, iconos y archivos multimedia
* **`/test`**: Configuración y utilidades para pruebas automatizadas

## 🔒 Sistema de Routing y Protección de Rutas

Tuiter implementa un sistema de enrutamiento y protección de rutas que garantiza que solo los usuarios autenticados puedan acceder a ciertas funcionalidades de la aplicación.

### Estructura de Routing

La aplicación utiliza **React Router v7** para gestionar la navegación entre diferentes vistas. Las principales rutas incluyen:

* **Rutas Públicas** (accesibles sin autenticación):
  * `/login`: Página de inicio de sesión
  * `/users/register`: Página de registro de usuarios
  * `*`: Página 404 (Not Found)

* **Rutas Protegidas** (requieren autenticación):
  * `/` y `/feed`: Feed principal de publicaciones
  * `/posts/create`: Creación de nuevas publicaciones
  * `/posts/:postId/reply`: Responder a una publicación específica
  * `/users/edit`: Edición del perfil de usuario
  * `/users/favorites`: Gestión de usuarios favoritos

### Funcionamiento del AuthGuard
El sistema de protección de rutas se implementa mediante un componente `AuthGuard` que actúa como un middleware para verificar la autenticación.

## 🌐 Servicios y Comunicación con la API

Tuiter implementa una capa de servicios que facilita la comunicación con el backend a través de una API RESTful. Esta arquitectura permite separar la lógica de negocio de la interfaz de usuario y mantener un código más organizado y mantenible.

### Estructura de Servicios

La carpeta `/services` contiene módulos especializados para cada dominio de la aplicación:

* **ApiService**: Servicio base que proporciona una interfaz unificada para realizar peticiones HTTP utilizando Axios.
* **FeedService**: Gestiona la obtención del feed de publicaciones del usuario.
* **TuitsService**: Maneja todas las operaciones relacionadas con las publicaciones (crear, obtener, dar like, responder).
* **ProfileService**: Administra las operaciones del perfil de usuario (obtener y actualizar).
* **UserService**: Controla las operaciones de usuario (registro e inicio de sesión).

### Configuración de Axios

La aplicación utiliza Axios para las comunicaciones HTTP, con una configuración personalizada:

* **AxiosBase**: Instancia configurada de Axios con timeout, URL base y manejo de credenciales.
* **Interceptores**: Modifican automáticamente las peticiones y respuestas:
  * **Request Interceptor**: Añade los tokens de autenticación y aplicación a cada petición.
  * **Response Interceptor**: Maneja errores de respuesta de forma centralizada.

### Ejemplo de Servicio

Cada servicio exporta funciones que encapsulan las llamadas a la API:

```typescript
export async function apiGetFeed(params?: FeedParams) {
    return ApiService.fetchDataWithAxios<TuitResponse[]>({
        url: '/me/feed',
        method: 'get',
        params
    });
}
```

## 🧪 Pruebas (Testing)

[![codecov](https://codecov.io/gh/leandrodrey/tuiter/graph/badge.svg?token=HE90Y9GXHQ)](https://codecov.io/gh/leandrodrey/tuiter)

Este proyecto utiliza un conjunto de herramientas y configuraciones para asegurar la calidad y el correcto funcionamiento del código a través de pruebas automatizadas.

### Herramientas Utilizadas

* **[Vitest](https://vitest.dev/):** Es el framework principal para ejecutar nuestras pruebas. Es rápido, compatible con Vite y ofrece una sintaxis similar a Jest, incluyendo globales como `describe`, `it`, y `expect`.
* **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/):** Se utiliza para testear los componentes de React de una manera que simula cómo los usuarios interactúan con ellos, enfocándose en el comportamiento más que en los detalles de implementación.
* **`@vitest/coverage-v8`:** Para generar reportes de cobertura de código, permitiéndonos ver qué porcentaje de nuestro código está cubierto por los tests.

### Tipos de Pruebas

Implementamos principalmente:

1.  **Pruebas Unitarias:** Se enfocan en testear las unidades más pequeñas de código de forma aislada (funciones individuales, componentes con sus dependencias directas mockeadas).
2.  **Pruebas de Integración (a nivel de componentes):** Verifican que múltiples componentes interactúen correctamente entre sí o que un componente se integre adecuadamente con servicios o librerías como Formik.

### Funcionamiento

* Los archivos de test se encuentran generalmente junto a los archivos que prueban y utilizan la extensión `.test.ts` o `.test.tsx`.
* Se definen casos de prueba usando `describe` para agrupar tests relacionados e `it` (o `test`) para cada caso individual.
* Las aserciones se realizan con `expect` para verificar que el resultado obtenido coincide con el esperado.
* Para los componentes de React, se utiliza `render` de React Testing Library para montar el componente en un DOM virtual, y `screen` y `fireEvent` (o `userEvent`) para interactuar con él y verificar su salida y comportamiento.

### Comandos Útiles

Puedes encontrar estos scripts en el archivo `package.json`:

* `yarn test`: Ejecuta todos los tests una vez.
* `yarn test:watch`: Ejecuta los tests en modo "watch", re-ejecutándolos automáticamente cuando detecta cambios en los archivos.
* `yarn test:coverage`: Ejecuta todos los tests y genera un reporte de cobertura en la carpeta `./coverage`.

### Integración Continua y Cobertura de Código con GitHub Actions & Codecov

Contamos con un workflow de Integración Continua (CI) configurado mediante **GitHub Actions** para asegurar la calidad del código en cada Pull Request dirigido a la rama `master`.

**Archivo del Workflow:** `.github/workflows/code-quality.yml`

**¿Cómo Funciona?**

El workflow `Quality Control CI` se dispara automáticamente con cada Pull Request a `master` y realiza los siguientes pasos:

1.  **Checkout code:** Clona el código del repositorio.
2.  **Set up Node.js:** Configura la versión de Node.js especificada (actualmente v22) y habilita el caché para Yarn para acelerar las instalaciones.
3.  **Install dependencies:** Instala todas las dependencias del proyecto usando `yarn install --frozen-lockfile` para asegurar una instalación consistente.
4.  **Run linters:** Ejecuta `yarn lint` para verificar que el código cumple con las reglas de estilo y calidad definidas. Si el linting falla, el workflow se detiene.
5.  **Run tests and generate coverage report:** Ejecuta `yarn test:coverage`. Este comando corre todos los tests con Vitest y genera un reporte de cobertura (en formato `lcov`, entre otros) en la carpeta `./coverage`. Si algún test falla, el workflow se detiene.
6.  **Upload coverage to Codecov:** Utiliza la acción `codecov/codecov-action@v4` para subir el reporte `lcov.info` (generado en el paso anterior) a [**Codecov.io**](https://codecov.io/). Para esto, se utiliza un token (`CODECOV_TOKEN`) almacenado de forma segura como un "secret" en la configuración del repositorio de GitHub.

**¿Para qué Sirve esta Configuración?**

* **Detección Temprana de Errores:** Los tests y el linting se ejecutan automáticamente, ayudando a detectar problemas antes de que el código se fusione a la rama principal.
* **Mantenimiento de la Calidad del Código:** Asegura que se cumplan los estándares de codificación y que los tests pasen.
* **Visibilidad de la Cobertura:** Codecov procesa el reporte de cobertura y proporciona:
    * Un **badge** en el `README.md` mostrando el porcentaje actual de cobertura de código.
    * **Comentarios en los Pull Requests** detallando cómo los nuevos cambios afectan la cobertura, mostrando las líneas cubiertas y las no cubiertas. Esto facilita la revisión y ayuda a asegurar que se añadan tests para el nuevo código.
    * Un **dashboard en Codecov.io** con un historial y análisis detallado de la cobertura del proyecto.

Esto nos ayuda a mantener una base de código saludable, reducir regresiones y tener más confianza al realizar cambios y nuevas funcionalidades.

![image](https://github.com/user-attachments/assets/7d3e8ca5-fba1-4bcc-ad44-6dcd16f5b25c)


## 🚀 Despliegue (Deployment)

Esta aplicación está desplegada en la plataforma [**Vercel**](https://vercel.com/). 

### ¿Por qué Vercel?

Hemos elegido Vercel para el despliegue de este proyecto debido a sus ventajas clave:

* **Facilidad de Despliegue Continuo:** Integración nativa con GitHub para automatización.
* **Alto Rendimiento Global:** Gracias a su CDN y optimizaciones automáticas.
* **Previews de Despliegue Instantáneas:** Para cada _commit_ y _Pull Request_.
* **Escalabilidad Automática:** Maneja el tráfico sin intervención manual.
* **Seguridad por Defecto:** HTTPS y otras protecciones integradas.
* **Soporte para Funciones Serverless:** Permite añadir lógica de backend fácilmente.

### Variables de Entorno

Todas las variables de entorno necesarias para la aplicación se gestionan de forma segura directamente en la configuración del proyecto dentro de Vercel. **No se almacenan en el repositorio Git** por razones de seguridad.

Vercel permite configurar variables de entorno para diferentes entornos (Producción, Vista Previa y Desarrollo) y las inyecta automáticamente durante el proceso de _build_ .

### Integración con GitHub y Despliegue Automático

La integración entre Vercel y GitHub es uno de los puntos fuertes de la plataforma:

1.  **Conexión del Repositorio:** El repositorio de GitHub está conectado al proyecto en Vercel.
2.  **Despliegues Automáticos a Producción:** Cuando se fusionan cambios (merge) a la rama principal (en nuestro caso, `master`), Vercel automáticamente inicia un nuevo _build_ y despliega la versión actualizada a producción. Esto asegura que el sitio en vivo siempre refleje el último código estable.
3.  **Previews de Despliegue para Pull Requests:** Por cada _Pull Request_ abierto (o cada _commit_ a una rama diferente a `master`), Vercel crea un despliegue de vista previa con su propia URL. Esto es invaluable para:
  * Revisar los cambios visual y funcionalmente.
  * Realizar pruebas de calidad (QA) en un entorno aislado.
  * Facilitar la colaboración.

Ejemplo de Reporte
![image](https://github.com/user-attachments/assets/f9d33c2a-7328-4b52-ae0a-5735e504d687)

### Consideraciones Adicionales

* **Seguridad:** Además de la gestión segura de variables de entorno y HTTPS por defecto, Vercel ofrece protección contra ataques comunes.
* **Monitorización:** Vercel proporciona un dashboard con logs en tiempo real, análisis de uso y monitorización del estado de los despliegues y funciones serverless.
* **Rollbacks:** Gracias a los despliegues atómicos e inmutables de Vercel, es muy sencillo revertir a una versión anterior del despliegue si se detecta algún problema.
