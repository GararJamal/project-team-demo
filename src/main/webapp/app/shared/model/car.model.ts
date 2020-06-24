import { IDriver } from 'app/shared/model/driver.model';

export interface ICar {
  id?: number;
  drivers?: IDriver[];
}

export const defaultValue: Readonly<ICar> = {};
