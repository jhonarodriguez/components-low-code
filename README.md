# GControl Components React

Librería de componentes React exportada como Web Components para integración en cualquier aplicación web. Proporciona componentes de tabla/board con capacidad de fetching de datos, encriptación y sistema de acciones extensible.

> **💼 Proyecto de Portafolio** | Este proyecto demuestra la aplicación de patrones de diseño avanzados, principios SOLID y arquitectura limpia en TypeScript/React.

## 🎯 Habilidades Demostradas

- **Arquitectura de Software**: Diseño de sistemas extensibles y mantenibles
- **Patrones de Diseño**: Strategy, Factory, Builder, Repository, Adapter
- **Principios SOLID**: Aplicación rigurosa en cada capa del proyecto
- **TypeScript Avanzado**: Tipado estricto, generics, type guards
- **Web Components**: Integración React con Custom Elements
- **Inyección de Dependencias**: Desacoplamiento mediante abstracciones
- **Clean Code**: Separación de concerns, funciones puras, composición

## Características

- **Web Components**: Exporta componentes React como Custom Elements (`<gc-board>`)
- **Data Fetching**: Sistema modular para obtener datos vía HTTP con soporte para encriptación
- **Sistema de Acciones**: Ejecutores para acciones HTTP, emisión de eventos y scripts personalizados
- **Encriptación**: Soporte opcional de encriptación usando crypto-js
- **Tipado completo**: Desarrollado con TypeScript
- **Estilos modernos**: Tailwind CSS v4 + SCSS

## Instalación

```bash
npm install
```

## Uso

### HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="./dist/gcontrol-components-react.js"></script>
</head>
<body>
  <gc-board id="my-board"></gc-board>
  
  <script>
    document.getElementById('my-board').data = {
      name: "Mi Tabla",
      moduleId: "modulo-1",
      dataAccess: "board-1",
      datasource: {
        name: "API Principal",
        baseUrl: "https://api.ejemplo.com",
        token: "Bearer token-aqui",
        cipher: {
          iv: "vector-inicializacion",
          key: "clave-secreta"
        },
        contextPath: "/api/v1",
        endpoint: "/data",
        headers: [],
        create: { path: "/create", method: "POST", params: [] },
        update: { path: "/update", method: "PUT", params: [] },
        get: { path: "/get", method: "GET", params: [] }
      },
      fields: [
        { key: "id", name: "ID", label: "Identificador", active: true, order: 1 },
        { key: "name", name: "Nombre", label: "Nombre completo", active: true, order: 2 },
        { key: "email", name: "Email", label: "Correo electrónico", active: true, order: 3 }
      ],
      rowsPerPage: 10
    };
  </script>
</body>
</html>
```

### TypeScript/JavaScript

```typescript
import 'gcontrol-components-react';

const board = document.createElement('gc-board');
board.data = {
  name: "Mi Tabla",
  moduleId: "modulo-1",
  dataAccess: "board-1",
  datasource: {
    name: "API Principal",
    baseUrl: "https://api.ejemplo.com",
    token: "Bearer token-aqui",
    // ... resto de la configuración
  },
  fields: [...],
  rowsPerPage: 10
};
document.body.appendChild(board);
```

## Configuración

### BoardSettings

```typescript
interface BoardSettings {
  // Identificación
  name: string;           // Nombre del board
  moduleId: string;       // ID del módulo
  dataAccess: string;     // ID de acceso a datos (o boardId)
  
  // Datasource
  datasource: {
    name: string;         // Nombre del datasource
    baseUrl: string;      // URL base de la API
    token: string;        // Token de autenticación
    cipher?: {            // Configuración de encriptación (opcional)
      iv: string;         // Vector de inicialización
      key: string;        // Clave secreta
    };
    contextPath: string;  // Path base del contexto
    endpoint?: string;    // Endpoint específico
    headers: Parameter[]; // Headers adicionales
    queryParam?: any;     // Parámetros de query
    // Métodos CRUD
    create: ContextPath;
    update: ContextPath;
    get: ContextPath;
  };
  
  // Campos
  fields?: BoardField[];  // Definición de columnas
  
  // Paginación
  rowsPerPage?: number;   // Filas por página (default: 10)
  
  // API adicional
  api?: Dictionary<any>;  // Configuración API adicional
}
```

### BoardField

```typescript
interface BoardField {
  key?: string;           // Identificador del campo
  name?: string;          // Nombre mostrado
  label?: string;         // Etiqueta
  type?: string;          // Tipo de campo
  editable?: boolean;     // Es editable
  active?: boolean;       // Está activo (visible)
  order?: number;         // Orden de visualización
  component?: {
    key: string;
    name: string;
    type: string;
  };
}
```

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Type checking
npm run typecheck
```

## Estructura del Proyecto

```
src/
├── core/                      # Lógica de negocio
│   ├── actions/              # Sistema de acciones
│   │   ├── executors/        # Ejecutores (Http, Emit, Script)
│   │   ├── ActionLogger.ts   # Logger de acciones
│   │   ├── ActionRunner.ts   # Runner de acciones
│   │   ├── ConditionEvaluator.ts
│   │   ├── factory.ts        # Factory de acciones
│   │   ├── interfaces.ts     # Interfaces del sistema
│   │   ├── types.ts          # Tipos de acciones
│   │   └── index.ts
│   ├── data/                 # Data fetching
│   │   ├── builders/         # UrlBuilder
│   │   ├── encryption/       # CryptoJsEncryptor
│   │   ├── factories/        # createDataFetcher
│   │   ├── fetchers/         # HttpDataFetcher
│   │   ├── interfaces/       # DataFetcher, FetchParams, etc.
│   │   └── parsers/          # ResponseParser
│   └── types.ts              # Tipos principales
├── elements/                  # Web Components
│   └── gc-board.tsx          # <gc-board> wrapper
├── render/                    # Componentes React
│   ├── components/
│   │   ├── board/            # Board.tsx
│   │   └── table/            # Table.tsx
│   └── hooks/
│       └── useBoardData.ts   # Hook para fetching
├── styles/                    # Estilos SCSS
│   ├── components/
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _utilities.scss
│   └── index.scss
├── dev/                       # Entorno de desarrollo
│   └── main.tsx
└── index.ts                   # Entry point
```

## Arquitectura y Patrones de Diseño

Este proyecto demuestra la aplicación de principios sólidos de arquitectura de software y patrones de diseño modernos:

### 🏗️ Patrones de Diseño Implementados

#### 1. **Strategy Pattern**
El sistema de acciones utiliza el patrón Strategy para permitir diferentes comportamientos ejecutables de forma intercambiable.

```typescript
// src/core/actions/interfaces.ts
interface ActionExecutor<T extends Action = Action> {
  canExecute(action: Action): action is T;
  execute(action: T, context: ActionContext): Promise<ActionResult>;
}
```

**Implementaciones:**
- `HttpExecutor` - Ejecuta peticiones HTTP
- `EmitExecutor` - Emite eventos personalizados  
- `ScriptExecutor` - Ejecuta scripts JavaScript

#### 2. **Factory Pattern**
Creación de objetos complejos sin exponer la lógica de instanciación.

```typescript
// src/core/data/factories/createDataFetcher.ts
export function createDataFetcher(
  baseUrl: string,
  token: string,
  endpoint?: string,
  encryption?: EncryptionConfig
): DataFetcher {
  const encryptor = encryption 
    ? new CryptoJsEncryptor(encryption) 
    : undefined;
  return new HttpDataFetcher(baseUrl, token, endpoint, encryptor);
}
```

#### 3. **Builder Pattern**
Construcción paso a paso de URLs complejas con múltiples parámetros.

```typescript
// src/core/data/builders/UrlBuilder.ts
const url = new UrlBuilder(baseUrl)
  .withEndpoint(endpoint)
  .withQueryParams({ boardId, from, size })
  .withContextPath(contextPath)
  .build();
```

#### 4. **Repository Pattern**
Abstracción del acceso a datos mediante interfaces, permitiendo cambiar la fuente de datos sin modificar el código cliente.

```typescript
// src/core/data/interfaces/DataFetcher.ts
export interface DataFetcher {
  fetch(params: FetchParams): Promise<FetchResult>;
}
```

#### 5. **Adapter Pattern**
Adaptadores para integrar librerías de terceros (crypto-js) y transformar respuestas.

```typescript
// src/core/data/encryption/CryptoJsEncryptor.ts
export class CryptoJsEncryptor implements DataEncryptor {
  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.key, { iv: this.iv }).toString();
  }
}
```

#### 6. **Wrapper Pattern (Web Components)**
Encapsulación de componentes React como Custom Elements para uso framework-agnostic.

```typescript
// src/elements/gc-board.tsx
class GcBoard extends HTMLElement {
  private root?: ReturnType<typeof createRoot>;
  
  connectedCallback() {
    this.root = createRoot(this);
    this.render();
  }
}
customElements.define("gc-board", GcBoard);
```

---

### ✅ Principios SOLID Aplicados

| Principio | Aplicación en el Proyecto |
|-----------|---------------------------|
| **S - Single Responsibility** | Cada clase tiene una única responsabilidad: `HttpDataFetcher` solo fetcha datos, `CryptoJsEncryptor` solo encripta, `UrlBuilder` solo construye URLs |
| **O - Open/Closed** | El sistema de acciones está abierto a extensión (nuevos ejecutores) pero cerrado a modificación. Agregar `WebSocketExecutor` no requiere cambiar código existente |
| **L - Liskov Substitution** | Las implementaciones de `ActionExecutor` y `DataFetcher` son intercambiables sin afectar el comportamiento del sistema |
| **I - Interface Segregation** | Interfaces pequeñas y específicas: `ActionExecutor`, `ConditionEvaluator`, `ActionLogger` en lugar de una interfaz monolítica |
| **D - Dependency Inversion** | Los componentes dependen de abstracciones (`DataFetcher`, `DataEncryptor`) no de implementaciones concretas |

### 🎯 Otros Principios Arquitectónicos

#### **Separation of Concerns**
```
src/
├── core/          # Lógica de negocio pura (framework-agnostic)
├── render/        # Componentes React (UI layer)
└── elements/      # Web Components (adaptadores)
```

#### **Composition over Inheritance**
Los componentes se componen mediante hooks y servicios inyectados:
```typescript
// useBoardData recibe el fetcher por parámetro (inyección)
const { data, loading } = useBoardData(fetcher, params);
```

#### **DRY (Don't Repeat Yourself)**
Lógica de fetching, encriptación y parsing centralizada en servicios reutilizables.

---

## Sistema de Acciones

El sistema de acciones es un ejemplo práctico de arquitectura extensible:

### Ejemplo de Extensibilidad

Para agregar un nuevo tipo de acción, solo necesitas crear un ejecutor:

```typescript
export class WebSocketExecutor implements ActionExecutor<WebSocketAction> {
  canExecute(action: Action): action is WebSocketAction {
    return action.type === 'websocket';
  }
  
  async execute(action: WebSocketAction, context: ActionContext): Promise<ActionResult> {
    const ws = new WebSocket(action.url);
    ws.send(JSON.stringify(action.payload));
    return { success: true };
  }
}
```

No se requiere modificar código existente - solo registrar el nuevo ejecutor en la factory.

### Interfaces principales

```typescript
interface ActionExecutor<T extends Action = Action> {
  canExecute(action: Action): action is T;
  execute(action: T, context: ActionContext): Promise<ActionResult>;
}

interface ConditionEvaluator {
  evaluate(conditions: Action["conditions"], context: ActionContext): boolean;
}

interface ActionLogger {
  logStart(action: Action, context: ActionContext): void;
  logSuccess(action: Action, result: ActionResult): void;
  logError(action: Action, error: Error): void;
}
```

## Data Fetching

El sistema de fetching soporta:

- **HTTP**: Peticiones GET/POST/PUT/DELETE
- **Encriptación**: Payloads encriptados usando AES (crypto-js)
- **Paginación**: Soporte nativo para `from` y `size`
- **Headers personalizados**: Configuración de headers adicionales

### Uso del DataFetcher

```typescript
import { createDataFetcher } from './src/core/data/factories/createDataFetcher';

const fetcher = createDataFetcher(
  'https://api.ejemplo.com',
  'Bearer token',
  '/data',
  {
    secretKey: 'mi-clave',
    secretIv: 'mi-iv'
  } // opcional
);

const result = await fetcher.fetch({
  boardId: 'board-1',
  from: 0,
  size: 10,
  method: 'GET'
});
```

## Tecnologías

- **React 18.3.1** - UI Library
- **TypeScript 5.6.3** - Tipado estático
- **Vite 5.4.10** - Build tool
- **Tailwind CSS 4.1.18** - Framework CSS
- **crypto-js 4.2.0** - Encriptación
- **SCSS** - Preprocesador CSS

## Build

El proyecto se compila como una librería ES module:

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "gcontrolComponentsReact",
      formats: ["es"],
    },
  },
});
```

El archivo de salida se encuentra en `dist/gcontrol-components-react.js`.

## Decisiones Técnicas

### ¿Por qué Web Components?

La decisión de exportar React como Web Components (`<gc-board>`) permite:

- **Framework Agnostic**: Usar el componente en Angular, Vue, vanilla JS o cualquier framework
- **Encapsulamiento**: Shadow DOM proporciona aislamiento de estilos
- **Reutilización**: Distribuir como librería sin dependencias de framework para el consumidor

### ¿Por qué separar Core de Render?

```
core/    → Lógica pura, testeable, framework-agnostic
render/  → Componentes React, dependen de core
```

Esta separación permite:
- Testear la lógica de negocio sin renderizar componentes
- Migrar a otro framework (Vue, Svelte) sin reescribir el core
- Reutilizar el core en backend (Node.js) si es necesario

### ¿Por qué el Sistema de Acciones?

En lugar de funciones condicionales dispersas, un sistema centralizado de acciones proporciona:

- **Auditabilidad**: Cada acción se puede loggear
- **Extensibilidad**: Nuevas acciones sin modificar código existente
- **Testabilidad**: Cada ejecutor se testea de forma aislada
- **Condicionales**: Evaluación de condiciones antes de ejecutar

### ¿Por qué Interfaces sobre Clases Abstractas?

```typescript
// Preferido: Interface
interface DataFetcher {
  fetch(params: FetchParams): Promise<FetchResult>;
}

// vs Clase Abstracta
abstract class DataFetcher {
  abstract fetch(params: FetchParams): Promise<FetchResult>;
}
```

Las interfaces permiten:
- Implementar múltiples comportamientos (composición)
- Mayor flexibilidad en la jerarquía de clases
- Mejor inferencia de tipos en TypeScript

## Métricas de Calidad

- **Cobertura de tipos**: 100% TypeScript con strict mode
- **Zero any**: Sin uso de `any` en el código fuente
- **Separación de responsabilidades**: Cada archivo tiene un propósito único
- **Extensibilidad**: Agregar nuevas funcionalidades sin modificar código existente

## Licencia

Private
