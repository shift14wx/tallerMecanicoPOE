import { IAutomovil } from '@/shared/model/automovil.model';

export interface ICliente {
  id?: number;
  nombre?: string;
  telefono?: string;
  email?: string;
  dui?: string;
  automovils?: IAutomovil[];
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public nombre?: string,
    public telefono?: string,
    public email?: string,
    public dui?: string,
    public automovils?: IAutomovil[]
  ) {}
}
