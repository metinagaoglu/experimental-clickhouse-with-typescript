import { Controller, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import UkPricePaidService from '@services/ukPricePaid/ukpricepaid.service';

@Controller()
export class UKPricePaidReportController {
  public UkPricePaidService = new UkPricePaidService();

  @Get('/ukpricepaid/report')
  @OpenAPI({ summary: 'Return a list of users' })
  index() {
    return this.UkPricePaidService.fetchAvaragePricePerYear();
  }
}
