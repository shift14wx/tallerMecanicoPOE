import { IEntrada } from '@/shared/model/entrada.model';
import { IRol } from '@/shared/model/rol.model';

export interface IEmpleado {
  id?: number;
  nombre?: string;
  edad?: number;
  dui?: string;
  telefono?: string;
  entradas?: IEntrada[];
  rol?: IRol;
}

export class Empleado implements IEmpleado {
  constructor(
    public id?: number,
    public nombre?: string,
    public edad?: number,
    public dui?: string,
    public telefono?: string,
    public entradas?: IEntrada[],
    public rol?: IRol
  ) {}
}
