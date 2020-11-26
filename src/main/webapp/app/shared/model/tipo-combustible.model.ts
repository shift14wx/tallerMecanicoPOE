import { IAutomovil } from '@/shared/model/automovil.model';

export interface ITipoCombustible {
  id?: number;
  combustible?: string;
  automovils?: IAutomovil[];
}

export class TipoCombustible implements ITipoCombustible {
  constructor(public id?: number, public combustible?: string, public automovils?: IAutomovil[]) {}
}
