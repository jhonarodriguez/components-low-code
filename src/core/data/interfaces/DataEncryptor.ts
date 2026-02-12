export interface DataEncryptor {
  encrypt(data: unknown): string;
  decrypt<T = unknown>(encryptedData: string): T;
}