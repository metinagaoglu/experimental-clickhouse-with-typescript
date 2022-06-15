import ClickhouseClient from '@/connections/ClickhouseClient';

class UkPricePaidRepository {
  //TODO: use enviroment variables for connection
  public connection: ClickhouseClient = new ClickhouseClient('clickhouse', 8123);

  /*
SELECT AVG(price) as pr,month,year FROM (
  SELECT 
   AVG(price) as price,
   toMonth(date) as month,
   toYear(date) as year
  FROM clickhouseSample.uk_price_paid
  GROUP BY date
) as t
GROUP BY month,year
ORDER BY pr DESC
*/
  public async fetchAvaragePricePerYear(): Promise<any> {
    const query = `SELECT AVG(price) as pr,month,year FROM (
      SELECT 
       AVG(price) as price,
       toMonth(date) as month,
       toYear(date) as year
      FROM clickhouseSample.uk_price_paid
      GROUP BY date
    ) as t
    GROUP BY month,year
    ORDER BY pr DESC`;

    return await this.connection.execute(query);
  }

  /*
  SELECT
      town,
      district,
      count() AS c,
      round(avg(price)) AS price,
      bar(price, 0, 5000000, 100)
  FROM clickhouseSample.uk_price_paid
  WHERE date >= '2019-01-01' AND date <= '2020-01-01'
  GROUP BY
      town,
      district
  HAVING c >= 100
  ORDER BY price DESC
  OFFSET 15 ROW FETCH FIRST 5 ROWS ONLY;
   */
  public async fetchAvaragePriceByTown() {
    const query = `
      SELECT
      town,
      district,
      count() AS c,
      round(avg(price)) AS price
  FROM clickhouseSample.uk_price_paid
  WHERE date >= '2019-01-01' AND date <= '2020-01-01'
  GROUP BY
      town,
      district
  HAVING c >= 100
  ORDER BY price DESC
  OFFSET 15 ROW FETCH FIRST 5 ROWS ONLY;`;

    return await this.connection.execute(query);
  }
}

export default UkPricePaidRepository;
