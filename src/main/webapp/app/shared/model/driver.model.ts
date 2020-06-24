import { ICar } from 'app/shared/model/car.model';

export interface IDriver {
  id?: number;
  cars?: ICar[];
}

export const defaultValue: Readonly<IDriver> = {};
