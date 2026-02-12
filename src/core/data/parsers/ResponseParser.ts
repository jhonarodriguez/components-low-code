import { DataEncryptor } from '../interfaces/DataEncryptor';
import { ApiResponse, FetchResult } from '../interfaces/FetchResult';
import { EncryptedPayload } from '../../types';

export class ResponseParser {
  constructor(private readonly encryptor?: DataEncryptor) {}
  
  parse<T>(response: ApiResponse<T | unknown> | EncryptedPayload): FetchResult<T> {
    if (this.isEncryptedResponse(response)) {
      return this.parseEncryptedResponse<T>(response);
    }
    
    return this.parseNormalResponse<T>(response as ApiResponse<T | unknown>);
  }
  
  private isEncryptedResponse(response: unknown): response is EncryptedPayload {
    return (
      typeof response === 'object' &&
      response !== null &&
      'crypto' in response &&
      typeof (response as EncryptedPayload).crypto === 'string'
    );
  }
  
  private parseEncryptedResponse<T>(response: EncryptedPayload): FetchResult<T> {
    if (!this.encryptor) {
      throw new Error('Received encrypted response but no encryptor configured');
    }
    
    const decrypted = this.encryptor.decrypt<{
      data: {
        result: T[];
        totalCount: number;
      };
    }>(response.crypto);
    console.log("🚀 ~ ResponseParser ~ parseEncryptedResponse ~ decrypted:", decrypted)
    
    return {
      result: decrypted.data.result,
      totalCount: decrypted.data.totalCount,
    };
  }
  
  private parseNormalResponse<T>(response: ApiResponse<T | unknown>): FetchResult<T> {
    if (response.data.statusCode !== 200) {
      throw new Error(`API Error: ${response.data.statusCode}`);
    }
    
    return {
      result: response.data.result as T[],
      totalCount: response.data.totalCount,
    };
  }
}