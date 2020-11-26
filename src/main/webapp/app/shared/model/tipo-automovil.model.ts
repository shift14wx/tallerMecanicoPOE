import { IAutomovil } from '@/shared/model/automovil.model';

export interface ITipoAutomovil {
  id?: number;
  tipo?: string;
  automovils?: IAutomovil[];
}

export class TipoAutomovil implements ITipoAutomovil {
  constructor(public id?: number, public tipo?: string, public automovils?: IAutomovil[]) {}
}
