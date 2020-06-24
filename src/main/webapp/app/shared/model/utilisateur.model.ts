import { Moment } from 'moment';
import { IRole } from 'app/shared/model/role.model';

export interface IUtilisateur {
  id?: number;
  eMAIL?: string;
  pHONENUMBER?: string;
  uSERNAME?: string;
  lASTSEEN?: string;
  dEACTIVATIONDATE?: string;
  fIRSTNAME?: string;
  lASTNAME?: string;
  oCCUPATION?: string;
  cITY?: string;
  kIND?: string;
  cREATEDBY?: number;
  cREATEDAT?: string;
  uPDATEDBY?: number;
  uPDATEDAT?: string;
  have?: IRole[];
}

export const defaultValue: Readonly<IUtilisateur> = {};
