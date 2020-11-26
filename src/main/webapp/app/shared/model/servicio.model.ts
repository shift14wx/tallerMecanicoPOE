import { IEntrada } from '@/shared/model/entrada.model';

export interface IServicio {
  id?: number;
  servicio?: string;
  entradas?: IEntrada[];
}

export class Servicio implements IServicio {
  constructor(public id?: number, public servicio?: string, public entradas?: IEntrada[]) {}
}
