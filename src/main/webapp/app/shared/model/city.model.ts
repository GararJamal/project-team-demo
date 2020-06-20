import { ICountry } from 'app/shared/model/country.model';

export interface ICity {
  id?: number;
  nom?: string;
  code?: string;
  in?: ICountry;
}

export const defaultValue: Readonly<ICity> = {};
