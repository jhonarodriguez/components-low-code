import { ActionExecutor, ActionLogger } from "../interfaces";
import { HttpAction, ActionContext, ActionResult } from "../types";

/**
 * Single Responsibility: solo ejecuta acciones HTTP
 */
export class HttpExecutor implements ActionExecutor<HttpAction> {
  constructor(private logger?: ActionLogger) {}

  canExecute(action: any): action is HttpAction {
    return action.type === "http";
  }

  async execute(action: HttpAction, context: ActionContext): Promise<ActionResult> {
    this.logger?.logStart(action, context);

    try {
      const url = this.buildUrl(action.url, action.query);
      const response = await this.fetch(url, action, context);
      const data = await this.parseResponse(response);

      const result: ActionResult = { success: true, data };
      this.logger?.logSuccess(action, result);
      return result;
    } catch (error) {
      this.logger?.logError(action, error as Error);
      return { success: false, error: error as Error };
    }
  }

  private buildUrl(url: string, query?: Record<string, unknown>): string {
    if (!query) return url;

    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });

    const queryString = params.toString();
    if (!queryString) return url;

    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}${queryString}`;
  }

  private async fetch(
    url: string,
    action: HttpAction,
    context: ActionContext
  ): Promise<Response> {
    const method = action.method ?? "POST";

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(action.headers ?? {}),
      },
    };

    if (method !== "GET" && action.payload) {
      options.body = JSON.stringify(action.payload);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  }

  private async parseResponse(response: Response): Promise<unknown> {
    const contentType = response.headers.get("content-type");
    
    if (contentType?.includes("application/json")) {
      return response.json();
    }
    
    return response.text();
  }
}