import ClickhouseClient from '@/connections/ClickhouseClient';
import { knex } from 'knex';

class UkPricePaidRepository {
  //TODO: use enviroment variables for connection
  public connection: ClickhouseClient = new ClickhouseClient('clickhouse', 8123);

  public knexInstance = knex({ client: 'pg', connection: {} });

  public async fetchAvaragePricePerYear(): Promise<any> {
    const query = this.knexInstance()
      .avg('price as price')
      .column([this.knexInstance.raw('toMonth(date) as month'), this.knexInstance.raw('toYear(date) as year')])
      .select()
      .from('clickhouseSample.uk_price_paid')
      .groupByRaw('month,year')
      .orderBy('price')
      .toString();

    return await this.connection.execute(query);
  }

  public async fetchAvaragePriceByTown() {
    const query = this.knexInstance()
      .column([
        this.knexInstance.raw('town'),
        this.knexInstance.raw('district'),
        this.knexInstance.raw('count() as total'),
        this.knexInstance.raw('round(avg(price)) AS price')
      ])
      .select()
      .from('clickhouseSample.uk_price_paid')
      .groupByRaw('town,district')
      .having('total', '>=', '100')
      .orderBy('price', 'DESC')
      .limit(50)
      .toString();

    return await this.connection.execute(query);
  }
}

export default UkPricePaidRepository;
