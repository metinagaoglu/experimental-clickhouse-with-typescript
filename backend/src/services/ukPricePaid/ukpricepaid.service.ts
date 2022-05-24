import UkPricePaidRepository from '@/repositories/ukpricepaid.repository';

class UkPricePaidService {
  public repository: UkPricePaidRepository = new UkPricePaidRepository();

  public async fetchAvaragePricePerYear() {
    return await this.repository.fetchAvaragePricePerYear();
  }
}

export default UkPricePaidService;
