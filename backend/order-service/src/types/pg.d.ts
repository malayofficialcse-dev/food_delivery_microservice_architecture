declare module "pg" {
  export class Pool {
    constructor(config?: Record<string, unknown>);
    query(text: string, values?: unknown[]): Promise<{ rows: any[]; rowCount: number }>;
    connect(): Promise<any>;
    on(event: string, listener: (...args: any[]) => void): this;
  }
}
