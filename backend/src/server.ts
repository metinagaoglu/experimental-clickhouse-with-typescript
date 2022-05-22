import App from '@/app';
import { AuthController } from '@controllers/auth.controller';
import { IndexController } from '@controllers/index.controller';
import { UsersController } from '@controllers/users.controller';
import { UKPricePaidReportController } from '@controllers/ukPricePaid/report.controller';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([AuthController, IndexController, UsersController, UKPricePaidReportController]);
app.listen();
