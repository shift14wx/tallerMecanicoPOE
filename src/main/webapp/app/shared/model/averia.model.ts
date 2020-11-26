import { IBitacoraAveria } from '@/shared/model/bitacora-averia.model';
import { IEntrada } from '@/shared/model/entrada.model';
import { IPago } from '@/shared/model/pago.model';
import { IAutomovil } from '@/shared/model/automovil.model';
import { IEstadoAveria } from '@/shared/model/estado-averia.model';

export interface IAveria {
  id?: number;
  fechaAveria?: Date;
  descripcion?: string;
  pagado?: boolean;
  bitacoraAverias?: IBitacoraAveria[];
  entradas?: IEntrada[];
  pagos?: IPago[];
  automovil?: IAutomovil;
  estadoAveria?: IEstadoAveria;
}

export class Averia implements IAveria {
  constructor(
    public id?: number,
    public fechaAveria?: Date,
    public descripcion?: string,
    public pagado?: boolean,
    public bitacoraAverias?: IBitacoraAveria[],
    public entradas?: IEntrada[],
    public pagos?: IPago[],
    public automovil?: IAutomovil,
    public estadoAveria?: IEstadoAveria
  ) {
    this.pagado = this.pagado || false;
  }
}
