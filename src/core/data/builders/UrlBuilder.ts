import { FetchParams } from "../interfaces/FetchParams";

export class UrlBuilder {
  private readonly baseUrl: string;
  private readonly endpoint: string;

  constructor(baseUrl: string, endpoint: string = '/module-engine/paginate') {
    this.baseUrl = baseUrl;
    this.endpoint = endpoint;
  }

  build(params: FetchParams): string {
    const url = new URL(this.endpoint, this.baseUrl);
    
    url.searchParams.set('boardId', params.boardId);
    url.searchParams.set('from', String(params.from ?? 0));
    url.searchParams.set('size', String(params.size ?? 10));
    
    if (params.orderBy) {
      url.searchParams.set('orderBy', params.orderBy);
      url.searchParams.set('order', params.order ?? 'asc');
    }
    
    if (params.filters && params.filters.length > 0) {
      url.searchParams.set('filters', JSON.stringify(params.filters));
    }
    
    if (params.word) {
      url.searchParams.set('word', params.word);
    }
    
    return url.toString();
  }
}