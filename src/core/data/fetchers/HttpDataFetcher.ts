import { UrlBuilder } from "../builders/UrlBuilder";
import { DataFetcher } from "../interfaces/DataFetcher";
import { FetchParams } from "../interfaces/FetchParams";
import { ApiResponse, FetchResult } from "../interfaces/FetchResult";
import { ResponseParser } from "../parsers/ResponseParser";
import { DataEncryptor } from "../interfaces/DataEncryptor";
import { EncryptedPayload } from "../../types";

export class HttpDataFetcher implements DataFetcher {
  constructor(
    private readonly urlBuilder: UrlBuilder,
    private readonly parser: ResponseParser,
    private readonly token: string,
    private readonly encryptor?: DataEncryptor
  ) {}
  
  async fetch<T>(params: FetchParams): Promise<FetchResult<T>> {
    const method = params.method ?? 'GET';
    const url = this.urlBuilder.build(params);
    
    const requestInit: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.token,
      },
    };
    
    if (this.shouldIncludeBody(method)) {
      const bodyData = this.buildBody(params);
      
      if (this.encryptor) {
        const encryptedBody: EncryptedPayload = {
          crypto: this.encryptor.encrypt(bodyData),
        };
        requestInit.body = JSON.stringify(encryptedBody);
      } else {
        requestInit.body = JSON.stringify(bodyData);
      }
    }
    
    const response = await fetch(url, requestInit);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    const data: ApiResponse<T | unknown> = await response.json();
    console.log("🚀 ~ HttpDataFetcher ~ fetch ~ data:", data)
    
    return this.parser.parse<T>(data);
  }
  
  private shouldIncludeBody(method: string): boolean {
    return ['POST', 'PUT', 'PATCH'].includes(method);
  }
  
  private buildBody(params: FetchParams): unknown {
    if (params.body) {
      return params.body;
    }
    
    return {
      boardId: params.boardId,
      from: params.from,
      size: params.size,
      orderBy: params.orderBy,
      order: params.order,
      filters: params.filters,
      word: params.word,
    };
  }
}