import { Controller, Get, Query } from '@nestjs/common';
import { GeocodeService } from './geocode.service';
import { Public } from '../auth/decorators';

@Controller('geocode')
export class GeocodeController {
  constructor(private readonly googleMapsService: GeocodeService) {}

  @Get('geocode')
  @Public()
  async geocode(@Query('address') address: string): Promise<any> {
    return await this.googleMapsService.geocode(address);
  }

  @Get('directions')
  @Public()
  async getDirections(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
  ): Promise<any> {
    return await this.googleMapsService.getDirections(origin, destination);
  }
}
