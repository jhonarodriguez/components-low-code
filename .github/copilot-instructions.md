# SKILL: gcontrol-components-react Architecture Guidelines

## CONTEXTO
Estás trabajando en la reestructuración de una librería de componentes web de Lit a React.
El objetivo es mantener compatibilidad con el DSL JSON actual mientras se aplica arquitectura limpia.

---

## PRINCIPIOS SOLID (OBLIGATORIOS)

### 1. Single Responsibility Principle (SRP)
**QUÉ**: Cada módulo/clase debe tener una única razón para cambiar.

**CÓMO APLICAR**:
- Separar lógica de negocio de presentación
- Un executor por tipo de acción (HttpExecutor, ScriptExecutor)
- Un validator por tipo de constraint (RequiredValidator, MaxLengthValidator)

**EJEMPLO**:
```typescript
// ❌ MAL: Una clase hace todo
class ActionHandler {
  async execute(action) {
    if (action.type === 'http') { /* http logic */ }
    if (action.type === 'script') { /* script logic */ }
    // validación, logging, condiciones mezcladas
  }
}

// ✅ BIEN: Responsabilidades separadas
class HttpExecutor implements ActionExecutor {
  async execute(action: HttpAction) { /* solo HTTP */ }
}
class ScriptExecutor implements ActionExecutor {
  async execute(action: ScriptAction) { /* solo scripts */ }
}
```

**POR QUÉ**: Facilita testing, mantenimiento y comprensión del código.

**PARA QUÉ**: Cambiar lógica HTTP no afecta lógica de scripts.

---

### 2. Open/Closed Principle (OCP)
**QUÉ**: Abierto a extensión, cerrado a modificación.

**CÓMO APLICAR**:
- Usar interfaces y registro de implementaciones
- Factory/Registry para agregar nuevos tipos sin tocar core

**EJEMPLO**:
```typescript
// ✅ BIEN: Agregar nuevo executor sin modificar ActionRunner
class ActionRunner {
  private executors: ActionExecutor[] = [];
  
  registerExecutor(executor: ActionExecutor) {
    this.executors.push(executor);
  }
}

// Agregar nuevo tipo de acción
runner.registerExecutor(new RedirectExecutor());
```

**POR QUÉ**: Evita regresiones al agregar funcionalidad.

**PARA QUÉ**: Escalar sin romper código existente.

---

### 3. Liskov Substitution Principle (LSP)
**QUÉ**: Los subtipos deben ser intercambiables con sus tipos base.

**CÓMO APLICAR**:
- Todos los executors implementan la misma interfaz
- Cualquier ActionExecutor puede usarse indistintamente

**EJEMPLO**:
```typescript
interface ActionExecutor<T extends Action = Action> {
  canExecute(action: Action): action is T;
  execute(action: T, context: ActionContext): Promise<ActionResult>;
}

// Todos son intercambiables
const executors: ActionExecutor[] = [
  new HttpExecutor(),
  new ScriptExecutor(),
  new EmitExecutor()
];
```

**POR QUÉ**: Garantiza consistencia en el comportamiento.

**PARA QUÉ**: Poder testear con mocks y cambiar implementaciones.

---

### 4. Interface Segregation Principle (ISP)
**QUÉ**: Interfaces pequeñas y específicas.

**CÓMO APLICAR**:
- Separar ActionExecutor, ConditionEvaluator, ActionLogger
- No forzar dependencias innecesarias

**EJEMPLO**:
```typescript
// ✅ BIEN: Interfaces segregadas
interface ActionExecutor { /* solo ejecución */ }
interface ConditionEvaluator { /* solo condiciones */ }
interface ActionLogger { /* solo logging */ }

// ❌ MAL: Interfaz monolítica
interface ActionHandler {
  execute();
  evaluateConditions();
  log();
  validate();
}
```

**POR QUÉ**: Clases no dependen de métodos que no usan.

**PARA QUÉ**: Reducir acoplamiento y facilitar testing.

---

### 5. Dependency Inversion Principle (DIP)
**QUÉ**: Depender de abstracciones, no de implementaciones concretas.

**CÓMO APLICAR**:
- Inyectar dependencias via constructor
- Usar interfaces, no clases concretas

**EJEMPLO**:
```typescript
// ✅ BIEN: Depende de interfaz
class ActionRunner {
  constructor(
    private conditionEvaluator: ConditionEvaluator,
    private logger?: ActionLogger
  ) {}
}

// ❌ MAL: Depende de implementación
class ActionRunner {
  private logger = new ConsoleActionLogger();
}
```

**POR QUÉ**: Facilita testing con mocks y cambio de implementaciones.

**PARA QUÉ**: Desacoplar componentes y mejorar testabilidad.

---

## PATRONES DE DISEÑO (OBLIGATORIOS)

### 1. Strategy Pattern
**QUÉ**: Encapsular algoritmos intercambiables.

**DÓNDE USAR**:
- Executors de acciones (HttpExecutor, ScriptExecutor)
- Validators (RequiredValidator, PatternValidator)
- ConditionEvaluator

**CÓMO**:
```typescript
interface ActionExecutor<T extends Action> {
  canExecute(action: Action): action is T;
  execute(action: T, context: ActionContext): Promise<ActionResult>;
}

class HttpExecutor implements ActionExecutor<HttpAction> {
  canExecute(action): action is HttpAction {
    return action.type === "http";
  }
  async execute(action, context) { /* implementación */ }
}
```

**POR QUÉ**: Agregar nuevos tipos sin modificar código existente.

---

### 2. Factory Pattern
**QUÉ**: Crear objetos sin exponer lógica de construcción.

**DÓNDE USAR**:
- createActionRunner()
- createValidator()
- createEventBus()

**CÓMO**:
```typescript
export function createActionRunner(options?: {
  enableLogging?: boolean;
}): ActionRunner {
  const logger = new ConsoleActionLogger(options?.enableLogging);
  const evaluator = new SimpleConditionEvaluator();
  const runner = new ActionRunner(evaluator, logger);
  
  runner.registerExecutor(new HttpExecutor(logger));
  runner.registerExecutor(new ScriptExecutor(logger));
  
  return runner;
}
```

**POR QUÉ**: Simplicar construcción y ocultar dependencias.

---

### 3. Facade Pattern
**QUÉ**: Interfaz simplificada para sistema complejo.

**DÓNDE USAR**:
- ActionRunner (oculta executors, evaluators, loggers)
- Board component (oculta table, form, actions)

**CÓMO**:
```typescript
class ActionRunner {
  async run(actions: Action[], context: ActionContext) {
    // Internamente usa executors, evaluators, loggers
    // pero el consumidor solo llama run()
  }
}
```

**POR QUÉ**: Simplificar API pública y ocultar complejidad.

---

### 4. Observer Pattern
**QUÉ**: Notificar a múltiples observadores de cambios.

**DÓNDE USAR**:
- Event Bus (emit/subscribe)
- Form changes
- Data updates

**CÓMO**:
```typescript
class SimpleEventBus implements EventBus {
  private listeners = new Map<string, Set<Handler>>();
  
  on(event: string, handler: Handler) {
    const set = this.listeners.get(event) ?? new Set();
    set.add(handler);
    this.listeners.set(event, set);
  }
  
  emit(event: string, data?: unknown) {
    this.listeners.get(event)?.forEach(fn => fn(data));
  }
}
```

**POR QUÉ**: Desacoplar emisores de receptores.

---

### 5. Chain of Responsibility
**QUÉ**: Pasar request por cadena de handlers.

**DÓNDE USAR**:
- Secuencia de acciones
- Validadores en cascada

**CÓMO**:
```typescript
async run(actions: Action[], context: ActionContext) {
  for (const action of actions) {
    const result = await this.executeAction(action, context);
    if (!result.success) break; // romper cadena si falla
  }
}
```

**POR QUÉ**: Ejecutar secuencias con control de flujo.

---

## ARQUITECTURA POR CAPAS

### Estructura obligatoria:
```
src/
  core/                    # Lógica de negocio pura (sin React)
    actions/               # Sistema de acciones
    validation/            # Sistema de validación
    eventBus/             # Event bus
    context/              # Context engine
    types.ts              # Tipos compartidos
  
  render/                 # Capa de presentación (React)
    components/           # Componentes React
      board/
      table/
      form/
      inputs/
      ui/
    registry/             # Mapeo tipo DSL → componente
  
  elements/               # Custom Elements (host)
    gc-view.tsx
    gc-board.tsx
    gc-form.tsx
```

**REGLAS**:
1. `core/` NO debe importar nada de `render/`
2. `render/` puede importar de `core/`
3. `elements/` solo monta React, delega a `render/`

---

## REGLAS DE CÓDIGO

### TypeScript estricto
- Activar `strict: true`
- No usar `any`, usar `unknown` y type guards
- Tipar todos los parámetros y retornos

### Nomenclatura
- Interfaces: `ActionExecutor`, `ConditionEvaluator`
- Clases: `HttpExecutor`, `SimpleEventBus`
- Funciones factory: `createActionRunner()`
- Tipos: `Action`, `ActionContext`, `ActionResult`

### Organización de archivos
- Un concepto por archivo
- index.ts como barrel export
- Agrupar por dominio (actions/, validation/)

### Testing
- Cada executor debe ser testeable aisladamente
- Mockear dependencias (logger, http)
- Tests unitarios para lógica core

---

## MIGRACIÓN DESDE LEGACY

### Al portar funcionalidad de gcontrol-components:

1. **Identificar responsabilidades**: ¿Qué hace este código?
2. **Separar concerns**: Render, lógica, datos
3. **Aplicar SOLID**: Extraer a clases/funciones específicas
4. **Crear interfaces**: Definir contratos antes de implementar
5. **Testear**: Verificar paridad con fixtures JSON

### Ejemplo de migración:
```typescript
// LEGACY (gcontrol-components)
class BoardComponent {
  async loadData() { /* fetch */ }
  render() { /* lit template */ }
  validate() { /* validación */ }
  executeActions() { /* acciones */ }
}

// REACT (gcontrol-components-react)
// 1. Core (sin React)
const runner = createActionRunner();
const validator = createValidator();

// 2. React component (solo presentación)
function Board({ settings }) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    runner.run(settings.api.paginate).then(setData);
  }, []);
  
  return <Table data={data} />;
}
```

---

## CHECKLIST DE CALIDAD

Antes de commitear, verificar:
- [ ] Aplica al menos 3 principios SOLID
- [ ] Usa al menos 2 patrones de diseño
- [ ] Core desacoplado de React
- [ ] Interfaces definidas antes de implementar
- [ ] Tipos estrictos (no `any`)
- [ ] Funciones puras donde sea posible
- [ ] Logging/error handling presente
- [ ] Comentarios JSDoc en APIs públicas

---

## ANTI-PATRONES (EVITAR)

❌ Mezclar lógica de negocio en componentes React
❌ Usar `any` o `as any`
❌ Hardcodear dependencias (no usar DI)
❌ Clases/funciones > 150 líneas
❌ Archivos > 300 líneas
❌ Imports circulares
❌ Mutar objetos directamente

---

## COMANDOS Y USO

### Crear nuevo executor:
1. Crear archivo en `src/core/actions/executors/NombreExecutor.ts`
2. Implementar `ActionExecutor<TipoAction>`
3. Registrar en factory: `runner.registerExecutor(new NombreExecutor())`

### Crear nuevo validador:
1. Crear archivo en `src/core/validation/validators/NombreValidator.ts`
2. Implementar `Validator`
3. Registrar en factory

### Agregar componente React:
1. Crear en `src/render/components/dominio/Componente.tsx`
2. Registrar en registry si es dinámico
3. Importar/usar donde se necesite