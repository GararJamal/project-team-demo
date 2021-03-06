import { ICity } from 'app/shared/model/city.model';

export interface ICountry {
  id?: number;
  nom?: string;
  code?: string;
  cities?: ICity[];
}

export const defaultValue: Readonly<ICountry> = {};
