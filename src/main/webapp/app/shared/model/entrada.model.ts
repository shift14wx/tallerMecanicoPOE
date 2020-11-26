import { IServicio } from '@/shared/model/servicio.model';
import { IAveria } from '@/shared/model/averia.model';
import { IEmpleado } from '@/shared/model/empleado.model';

export interface IEntrada {
  id?: number;
  descripcion?: string;
  activa?: boolean;
  precio?: number;
  servicio?: IServicio;
  averia?: IAveria;
  empleado?: IEmpleado;
}

export class Entrada implements IEntrada {
  constructor(
    public id?: number,
    public descripcion?: string,
    public activa?: boolean,
    public precio?: number,
    public servicio?: IServicio,
    public averia?: IAveria,
    public empleado?: IEmpleado
  ) {
    this.activa = this.activa || false;
  }
}
