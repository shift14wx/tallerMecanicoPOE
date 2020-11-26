import { IEmpleado } from '@/shared/model/empleado.model';

export interface IRol {
  id?: number;
  rol?: string;
  empleados?: IEmpleado[];
}

export class Rol implements IRol {
  constructor(public id?: number, public rol?: string, public empleados?: IEmpleado[]) {}
}
