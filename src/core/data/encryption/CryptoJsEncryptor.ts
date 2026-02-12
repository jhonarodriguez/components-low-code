import CryptoJS from 'crypto-js';
import { DataEncryptor } from '../interfaces/DataEncryptor';
import { EncryptionConfig } from '../../types';

export class CryptoJsEncryptor implements DataEncryptor {
  private readonly key: CryptoJS.lib.WordArray;
  private readonly iv: CryptoJS.lib.WordArray;
  
  constructor(config: EncryptionConfig) {
    this.key = CryptoJS.enc.Utf8.parse(config.secretKey);
    this.iv = CryptoJS.enc.Utf8.parse(config.secretIv);
  }
  
  encrypt(data: unknown): string {
    const jsonString = JSON.stringify(data);
    
    const encrypted = CryptoJS.AES.encrypt(
      jsonString,
      this.key,
      {
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        format: CryptoJS.format.Hex,
      }
    );
    
    return encrypted.toString();
  }
  
  decrypt<T = unknown>(encryptedData: string): T {
    const dataHex = CryptoJS.enc.Hex.parse(encryptedData);
    const base64Data = dataHex.toString(CryptoJS.enc.Base64);
    
    const decrypted = CryptoJS.AES.decrypt(
      base64Data,
      this.key,
      {
        iv: this.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!decryptedString) {
      throw new Error('Decryption failed: invalid key or corrupted data');
    }
    
    return JSON.parse(decryptedString) as T;
  }
}