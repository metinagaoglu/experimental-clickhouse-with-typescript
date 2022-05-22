import { ClickHouse } from 'clickhouse';
import schema from './migrations/uk_price_paid';

class ClickhouseClient {
  private client: ClickHouse;

  constructor(url: string, port: number) {
    this.client = new ClickHouse({
      url,
      port,
      debug: true,
      basicAuth: null,
      isUseGzip: false,
      trimQuery: false,
      usePost: false,
      format: 'json', // "json" || "csv" || "tsv"
      raw: false,
      config: {
        database: 'clickhouseSample',
      },
    });
  }

  public async execute(query: string): Promise<any> {
    return this.client.query(query);
  }

  public async migrate(): Promise<any> {
    return this.client.query(schema);
  }

}

export default ClickhouseClient;
