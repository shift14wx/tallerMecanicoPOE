import { IAveria } from '@/shared/model/averia.model';

export interface IPago {
  id?: number;
  fechaPago?: Date;
  total?: number;
  averia?: IAveria;
}

export class Pago implements IPago {
  constructor(public id?: number, public fechaPago?: Date, public total?: number, public averia?: IAveria) {}
}
