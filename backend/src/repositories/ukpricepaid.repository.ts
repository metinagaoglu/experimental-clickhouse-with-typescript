import ClickhouseClient from '@/connections/ClickhouseClient';

class UkPricePaidRepository {
  //TODO: use enviroment variables for connection
  public connection: ClickhouseClient = new ClickhouseClient('clickhouse', 8123);

  public async fetchAvaragePricePerYear(): Promise<any> {
    const query = `SELECT 
        toYear(date) AS year,
        round(avg(price)) AS price
    FROM uk_price_paid GROUP BY year
    ORDER BY year;`;

    console.log(this.connection);

    const results = await this.connection.execute(query);
    return results;
  }
}

export default UkPricePaidRepository;
