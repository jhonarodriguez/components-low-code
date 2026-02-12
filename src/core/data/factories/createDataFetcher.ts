import { EncryptionConfig } from "../../types";
import { UrlBuilder } from "../builders/UrlBuilder";
import { CryptoJsEncryptor } from "../encryption/CryptoJsEncryptor";
import { HttpDataFetcher } from "../fetchers/HttpDataFetcher";
import { DataFetcher } from "../interfaces/DataFetcher";
import { ResponseParser } from "../parsers/ResponseParser";

export function createDataFetcher(
    baseUrl: string,
    token: string,
    endpoint?: string,
    encryption?: EncryptionConfig,
): DataFetcher {
    const urlBuilder = new UrlBuilder(baseUrl, endpoint);

    const encryptor = encryption
        ? new CryptoJsEncryptor(encryption)
        : undefined;

    const parser = new ResponseParser(encryptor);

    return new HttpDataFetcher(urlBuilder, parser, token, encryptor);
}
