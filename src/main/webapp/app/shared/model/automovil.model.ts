import { IAveria } from '@/shared/model/averia.model';
import { ITipoCombustible } from '@/shared/model/tipo-combustible.model';
import { IClasificacionAutomovil } from '@/shared/model/clasificacion-automovil.model';
import { ICliente } from '@/shared/model/cliente.model';
import { IMarca } from '@/shared/model/marca.model';
import { ITipoAutomovil } from '@/shared/model/tipo-automovil.model';

export interface IAutomovil {
  id?: number;
  placa?: string;
  modelo?: string;
  color?: string;
  year?: number;
  nasientos?: number;
  estadogeneralautomovil?: string;
  numeromotor?: string;
  numerochasisgrabado?: string;
  averias?: IAveria[];
  tipoCombustible?: ITipoCombustible;
  clasificacionAutomovil?: IClasificacionAutomovil;
  cliente?: ICliente;
  marca?: IMarca;
  tipoAutomovil?: ITipoAutomovil;
}

export class Automovil implements IAutomovil {
  constructor(
    public id?: number,
    public placa?: string,
    public modelo?: string,
    public color?: string,
    public year?: number,
    public nasientos?: number,
    public estadogeneralautomovil?: string,
    public numeromotor?: string,
    public numerochasisgrabado?: string,
    public averias?: IAveria[],
    public tipoCombustible?: ITipoCombustible,
    public clasificacionAutomovil?: IClasificacionAutomovil,
    public cliente?: ICliente,
    public marca?: IMarca,
    public tipoAutomovil?: ITipoAutomovil
  ) {}
}
