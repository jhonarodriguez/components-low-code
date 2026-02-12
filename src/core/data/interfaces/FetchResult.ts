export interface FetchResult<T = unknown> {
  readonly result: T[];
  readonly totalCount: number;
}

export interface ApiResponse<T = unknown> {
  readonly data: {
    readonly statusCode: number;
    readonly result: T[];
    readonly totalCount: number;
  };
  readonly code: number;
}