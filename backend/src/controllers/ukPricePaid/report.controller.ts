import { Controller, Get } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';

@Controller()
export class UKPricePaidReportController {
  @Get('/ukpricepaid/report')
  @OpenAPI({ summary: 'Return a list of users' })
  index() {
    return 'OK';
  }
}
