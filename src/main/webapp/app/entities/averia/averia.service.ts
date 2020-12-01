import axios from 'axios';

import { IAveria } from '@/shared/model/averia.model';
import { ICliente } from '@/shared/model/cliente.model';

const baseApiUrl = 'api/averias';

export default class AveriaService {
  public IdAutomovil: number = 0;

  public find(id: number): Promise<IAveria> {
    return new Promise<IAveria>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public findAutomovilAverias(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl + `?IdAutomovil=${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public findClienteAutomovilAverias(IdAutomovil: number): Promise<ICliente> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`api/automovils/clienteof/${IdAutomovil}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public getTotalAPagar(averiaId: number) {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${averiaId}/entradas`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: IAveria): Promise<IAveria> {
    return new Promise<IAveria>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: IAveria): Promise<IAveria> {
    return new Promise<IAveria>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
