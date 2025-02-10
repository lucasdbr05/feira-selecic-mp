import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { GeocodeData, ViacepData } from './types';

@Injectable()
export class GeocodeService {
  private readonly baseUrl = 'https://maps.googleapis.com/maps/api';
  private readonly viacepUrl = 'https://viacep.com.br/ws';

  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async geocode(address: string): Promise<GeocodeData> {
    const apiKey = this.config.get<string>('GOOGLE_MAPS_API');

    const addressDetails = await this.getAdressDetails(address);
    const url = `${this.baseUrl}/geocode/json?address=${this.formatMapsAddress(addressDetails)}&key=${apiKey}`;
    return await this.requestData(url);
  }

  async getDirections(origin: string, destination: string): Promise<any> {
    const apiKey = this.config.get<string>('GOOGLE_MAPS_API');
    const originDetails = await this.getAdressDetails(origin);
    const destinationDetails = await this.getAdressDetails(destination);
    const url = `${this.baseUrl}/directions/json?origin=${this.formatMapsAddress(originDetails)}&destination=${this.formatMapsAddress(destinationDetails)}&key=${apiKey}`;
    return await this.requestData(url);
  }

  async getAdressDetails(cep: string): Promise<ViacepData> {
    const formatCEP = (cep: string): string => cep.replace(/\D/g, '');
    const formatedCep = formatCEP(cep);
    const url = `${this.viacepUrl}/${formatedCep}/json/`;
    return await this.requestData(url);
  }

  private formatMapsAddress(data: ViacepData): string {
    const address = `${data.logradouro}, ${data.bairro}, ${data.localidade}, ${data.estado}`;
    return encodeURIComponent(address);
  }
  private async requestData(url: string) {
    const res = await this.httpService.get(url);
    const response = await firstValueFrom(res);
    return response.data;
  }
}
