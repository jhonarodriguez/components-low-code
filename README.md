# Components LowCode

Libreria React empaquetada como **Web Component** (`<gc-board>`) para renderizar tableros/tablas configurables desde un objeto JSON (DSL).

## Estado del proyecto

- Proyecto **privado** (`"private": true` en `package.json`).
- Entrada publica actual: registro global del custom element `<gc-board>`.
- Build de libreria en formato ES module con Vite.
- Incluye app de desarrollo/demo en `src/dev/main.tsx`.

> Nota: el componente ya renderiza internamente con `StrictMode` en `src/elements/gc-board.tsx`.

## Stack tecnico

- React 18
- TypeScript (strict)
- Vite 5
- Tailwind CSS v4 + SCSS
- crypto-js (encriptacion AES)

## Scripts

```bash
npm run dev        # entorno de desarrollo
npm run build      # build de libreria (dist/)
npm run preview    # preview del build
npm run typecheck  # validacion de tipos
```

## Estructura real del codigo

```text
src/
├─ index.ts                         # importa estilos y registra <gc-board>
├─ dev/main.tsx                     # demo local (montada desde index.html)
├─ elements/gc-board.tsx            # wrapper Web Component -> React Board
├─ core/
│  ├─ types.ts                      # contratos principales (BoardSettings, fields, etc.)
│  ├─ data/                         # fetch, URL builder, parser, encriptacion
│  ├─ validation/                   # reglas de visibilidad para botones de acciones
│  └─ actions/                      # contratos + executor HTTP (parcial)
├─ render/
│  ├─ components/
│  │  ├─ board/Board.tsx            # orquesta fetch, tabla y modal de creacion
│  │  ├─ table/Table.tsx            # render tabla + paginacion + acciones por fila
│  │  ├─ form/Form.tsx              # formulario dinamico por registry
│  │  ├─ inputs/                    # input y textarea
│  │  ├─ modal/                     # modal base
│  │  └─ ui/                        # Button e Icon
│  ├─ hooks/useBoardData.ts         # hook de carga de datos
│  └─ registry/component-renderers/ # strategy/registry para campos renderizables
└─ styles/                          # Tailwind + SCSS
```

## Uso rapido

### 1) Desarrollo

`index.html` ya contiene un ejemplo:

```html
<gc-board id="demo-board"></gc-board>
<script type="module" src="/src/dev/main.tsx"></script>
```

### 2) Uso como libreria (build)

```html
<script type="module" src="./dist/gcontrol-components-react.js"></script>
<gc-board id="board"></gc-board>
<script>
  const board = document.getElementById("board");
  board.data = {
    name: "Clientes",
    moduleId: "modulo-1",
    dataAccess: "board-clientes",
    datasource: {
      name: "API",
      baseUrl: "https://api.example.com",
      token: "Bearer <token>",
      cipher: { key: "<key>", iv: "<iv>" },
      contextPath: "/api",
      endpoint: "/module-engine/paginate",
      headers: [],
      create: { path: "/create", method: "POST", params: [] },
      update: { path: "/update", method: "PUT", params: [] },
      get: { path: "/get", method: "GET", params: [] }
    },
    fields: [
      { key: "name", name: "Nombre", active: true, order: 1, component: { key: "name", name: "Nombre", type: "input" } }
    ],
    rowsPerPage: 10,
    actions: { create: true, position: "left" },
    permissions: ["all"]
  };
</script>
```

## Contratos clave

`BoardSettings` (en `src/core/types.ts`) extiende `TableSettings` y requiere:

- `moduleId: string`
- `dataAccess: string`
- `datasource` (baseUrl, token, endpoints CRUD y cipher)
- `fields` (columnas/componentes)
- `actions`, `permissions`, `btnsActionsTable` (opcionales)

## Arquitectura aplicada

- **Strategy + Registry** para renderizado de campos (`InputComponentRenderer`, `TextareaComponentRenderer`).
- **Factory** para creacion de `DataFetcher` (`createDataFetcher`).
- **Separacion por capas**:
  - `core`: logica de negocio y contratos
  - `render`: componentes React
  - `elements`: adaptador Web Component

## Observaciones actuales (importante)

Durante el analisis del repositorio se detecto:

1. `src/core/actions/ActionRunner.ts`, `factory.ts`, `ConditionEvaluator.ts`, `ActionLogger.ts`, `index.ts`, `EmitExecutor.ts` y `ScriptExecutor.ts` estan vacios o sin implementacion.
2. En `Board.tsx`, `handleSubmitCreate` actualmente cierra el modal pero no persiste ni emite evento.
3. Hay logs de debug (`console.log`) en `useBoardData.ts`, `HttpDataFetcher.ts` y `ResponseParser.ts`.
4. `src/dev/main.tsx` contiene datos sensibles de ejemplo; se recomienda usar variables de entorno y datos mock antes de compartir/publicar.

## Build output

El build genera:

- `dist/gcontrol-components-react.js`
- `dist/style.css`

## Licencia

Private / uso interno.
