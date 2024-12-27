import { AxiosRequestHeaders, RawAxiosRequestHeaders } from "axios";

export interface ScraperHeaders {
    enableAgentRotations: boolean;
    timeout: number;
    headers: RawAxiosRequestHeaders;
    baseUrl: string;
}

export interface HeaderOptions {
    enableAgentRotations?: boolean;
    enableLogging?: boolean;
    headers?: RawAxiosRequestHeaders;
    baseUrl?: string;
    timeout?: number;
}