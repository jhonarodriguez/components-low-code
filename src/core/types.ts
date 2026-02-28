export type Dictionary<T = unknown> = Record<string, T>;
export type BooleanLike = boolean | "true" | "false";

export interface Parameter {
  key: string;
  value: string;
}

export interface Cipher {
  iv: string;
  key: string;
}

export interface EncryptionConfig {
  readonly secretKey: string;
  readonly secretIv: string;
}

export interface EncryptedPayload {
  readonly crypto: string;
}

export interface ContextPath {
  path: string;
  method: string;
  params: Parameter[];
}

export type Datasource = {
  name: string;
  baseUrl: string;
  create: ContextPath;
  update: ContextPath;
  get: ContextPath;
  token: string;
  cipher: Cipher;
  contextPath: string;
  headers: Parameter[];
  endpoint?: string;
  queryParam?: unknown;
}

type Component = {
  key: string;
  name: string;
  type: string;
  datasource: Datasource;
}

export interface Field extends Component {
  label?: string;
  placeholder?: string;
  disabled?: BooleanLike;
  readOnly?: BooleanLike;
  inputType?: string;
  rows?: number;
}

export type ColumnField = {
  key?: string;
  name?: string;
  label?: string;
  component?: Field;
  id?: boolean;
  hidden?: boolean;
  type?: string;
  editable?: boolean;
  active?: boolean;
  order?: number;
};

export interface ValueChange {
  id: string;
  value: unknown;
}

export interface FormSettings {
  name?: string;
  fields: Field[];
  textSendBtn?: string;
  hiddenSubmit?: boolean;
  showCancel?: boolean;
}

export interface FormSubmitPayload {
  data: Record<string, unknown>;
}

export type ActionColumnPosition = "left" | "right";
export type ModalSize = "small" | "medium" | "large" | "fullscreen" | "auto";

export interface ModalSettings {
  open?: boolean;
  title?: string;
  description?: string;
  loading?: boolean;
  size?: ModalSize;
}

export type ValidationOperator =
  | "equals"
  | "notEquals"
  | "contains"
  | "notContains"
  | "greaterThan"
  | "greaterThanOrEqual"
  | "lessThan"
  | "lessThanOrEqual"
  | "existProperty"
  | "noExistProperty"
  | "notEqualsAnyRow";

export interface ButtonValidation {
  field: string;
  value: unknown;
  operator: ValidationOperator;
  expectedValue?: unknown;
  useValueTemplate?: boolean;
  fieldRow?: string;
}

export interface BtnActionConfig {
  key: string;
  name?: string;
  icon?: string;
  actionType: string;
  type?: string;
  textTooltip?: string;
  positionTooltip?: string;
  customClass?: string;
  hidden?: string;
  fieldsToUpdate?: Record<string, unknown>;
  textConfirmModal?: string;
  titleModal?: string;
  textBtnModal?: string;
  validations?: ButtonValidation[];
}

export interface Actions {
  position?: ActionColumnPosition;
  pagination?: boolean;
  create?: boolean;
  edit?: boolean;
  delete?: boolean;
}

export interface ButtonsNameSettings {
  icon?: string;
  create?: string;
}

export interface TableSettings extends Component {
  fields?: ColumnField[];
  actions?: Actions;
  rowsPerPage?: number;
  btnsActionsTable?: BtnActionConfig[];
  permissions?: string[];
  textSendBtn?: string;
  buttonsName?: ButtonsNameSettings;
}

export interface BoardSettings extends TableSettings {
  api?: Dictionary<unknown>;
  dataAccess: string;
  moduleId: string;
}

export interface FieldComponentProps {
  field: Field;
  value: unknown;
  onValueChange: (change: ValueChange) => void;
}

export interface Schema {
  fields: Record<string, SchemaField>;
}

export interface SchemaField {
  cipher: boolean;
  aliasKey: string;
  constraints: Constraint[];
  unique?: boolean;
  auditLog?: boolean;
}

export type Constraint = {
  name: string;
  value: string;
}

export interface ValidationError {
  field: string;
  message: string;
  constraint: Constraint;
}

export interface ValidationDataResult {
  isValid: boolean;
  errors: ValidationError[];
}