export type Dictionary<T = any> = Record<string, T>;

interface Parameter {
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

interface ContextPath {
  path: string;
  method: string;
  params: Parameter[];
}

type Datasource = {
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
  queryParam?: any;
}

type Component = {
  key: string;
  name: string;
  type: string;
  datasource: Datasource;
}

export type ColumnField = {
  key?: string;
  name?: string;
  label?: string;
  component?: {
    key: string;
    name: string;
    type: string;
  };
  type?: string;
  editable?: boolean;
  active?: boolean;
  order?: number;
};

export type ActionColumnPosition = "left" | "right";

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

export interface TableSettings extends Component {
  fields?: ColumnField[];
  actions?: Actions;
  rowsPerPage?: number;
  btnsActionsTable?: BtnActionConfig[];
  permissions?: string[];
}

export interface BoardSettings extends TableSettings {
  api?: Dictionary<unknown>;
  dataAccess: string;
  moduleId: string;
}