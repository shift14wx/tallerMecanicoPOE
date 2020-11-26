import axios from 'axios';

import { IClasificacionAutomovil } from '@/shared/model/clasificacion-automovil.model';

const baseApiUrl = 'api/clasificacion-automovils';

export default class ClasificacionAutomovilService {
  public find(id: number): Promise<IClasificacionAutomovil> {
    return new Promise<IClasificacionAutomovil>((resolve, reject) => {
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

  public create(entity: IClasificacionAutomovil): Promise<IClasificacionAutomovil> {
    return new Promise<IClasificacionAutomovil>((resolve, reject) => {
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

  public update(entity: IClasificacionAutomovil): Promise<IClasificacionAutomovil> {
    return new Promise<IClasificacionAutomovil>((resolve, reject) => {
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
