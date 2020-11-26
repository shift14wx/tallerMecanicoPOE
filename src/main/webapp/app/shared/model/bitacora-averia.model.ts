import { IAveria } from '@/shared/model/averia.model';

export interface IBitacoraAveria {
  id?: number;
  descripcion?: string;
  fechaBitacora?: Date;
  averia?: IAveria;
}

export class BitacoraAveria implements IBitacoraAveria {
  constructor(public id?: number, public descripcion?: string, public fechaBitacora?: Date, public averia?: IAveria) {}
}
