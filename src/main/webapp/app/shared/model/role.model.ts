import { Moment } from 'moment';

export interface IRole {
  id?: number;
  nAME?: string;
  cODE?: string;
  dESCRIPTION?: string;
  cREATEDBY?: number;
  cREATEDAT?: string;
  uPDATEDBY?: number;
  uPDATEDAT?: string;
}

export const defaultValue: Readonly<IRole> = {};
