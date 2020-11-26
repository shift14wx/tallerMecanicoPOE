import { IAutomovil } from '@/shared/model/automovil.model';

export interface IClasificacionAutomovil {
  id?: number;
  clasificacion?: string;
  automovils?: IAutomovil[];
}

export class ClasificacionAutomovil implements IClasificacionAutomovil {
  constructor(public id?: number, public clasificacion?: string, public automovils?: IAutomovil[]) {}
}
