import { IAutomovil } from '@/shared/model/automovil.model';

export interface IMarca {
  id?: number;
  marca?: string;
  automovils?: IAutomovil[];
}

export class Marca implements IMarca {
  constructor(public id?: number, public marca?: string, public automovils?: IAutomovil[]) {}
}
