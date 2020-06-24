import { Moment } from 'moment';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IRole {
  id?: number;
  nAME?: string;
  cODE?: string;
  dESCRIPTION?: string;
  cREATEDBY?: number;
  cREATEDAT?: string;
  uPDATEDBY?: number;
  uPDATEDAT?: string;
  assignedTos?: IUtilisateur[];
}

export const defaultValue: Readonly<IRole> = {};
