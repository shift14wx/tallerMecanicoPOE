import { IAveria } from '@/shared/model/averia.model';

export interface IEstadoAveria {
  id?: number;
  estado?: string;
  descripcion?: string;
  averias?: IAveria[];
}

export class EstadoAveria implements IEstadoAveria {
  constructor(public id?: number, public estado?: string, public descripcion?: string, public averias?: IAveria[]) {}
}
