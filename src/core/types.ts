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

export interface Actions {
  position?: ActionColumnPosition;
  pagination?: boolean;
}

export interface TableSettings extends Component {
  fields?: ColumnField[];
  actions?: Actions;
  rowsPerPage?: number;
}

export interface BoardSettings extends TableSettings {
  api?: Dictionary<any>;
  dataAccess: string;
  moduleId: string;
};