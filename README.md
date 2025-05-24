## 🧪 Pruebas (Testing)

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
