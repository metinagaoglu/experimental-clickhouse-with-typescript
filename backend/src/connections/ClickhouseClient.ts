import { ClickHouse } from 'clickhouse';
import schema from './migrations/uk_price_paid';

class ClickhouseClient {
  query(query: string) {
    throw new Error('Method not implemented.');
  }
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
    return this.client.query(query).toPromise();
  }

}

export default ClickhouseClient;
