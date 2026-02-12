export interface FetchParams {
    readonly boardId: string;
    readonly from?: number;
    readonly size?: number;
    readonly orderBy?: string;
    readonly order?: 'asc' | 'desc';
    readonly filters?: Record<string, unknown>[];
    readonly word?: string;
    readonly method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    readonly body?: unknown;
}