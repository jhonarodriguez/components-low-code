import { FetchParams } from "./FetchParams";
import { FetchResult } from "./FetchResult";

export interface DataFetcher {
  fetch<T = unknown>(params: FetchParams): Promise<FetchResult<T>>;
}