import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeocodeService {
  private readonly baseUrl = 'https://maps.googleapis.com/maps/api';
  private readonly viacepUrl = 'https://viacep.com.br/ws';

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async geocode(address: string): Promise<any> {
    const addressDetails = await this.getAdressDetails(address);
    console.log(addressDetails);
    const apiKey = this.config.get<string>('GOOGLE_MAPS_API');
    const url = `${this.baseUrl}/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    return await this.requestData(url);
  }

  async getDirections(origin: string, destination: string): Promise<any> {
    const apiKey = this.config.get<string>('GOOGLE_MAPS_API');
    const url = `${this.baseUrl}/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${apiKey}`;
    return await this.requestData(url);
  }

  async getAdressDetails(cep: string) {
    const formatCEP = (cep: string): string => cep.replace(/\D/g, '');
    console.log(formatCEP(cep));
    const formatedCep = formatCEP(cep);
    const url = `${this.viacepUrl}/${formatedCep}/json/`;
    return await this.httpService.get(url);
  }

  private async requestData(url: string) {
    const res = await this.httpService.get(url);
    const response = await firstValueFrom(res);
    return response.data;
  }
}
