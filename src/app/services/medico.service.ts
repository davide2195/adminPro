import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Medico, MedicoInterface } from '../models/medico.model';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
     return {
        headers: {
        'x-token': this.token
       }
     }
  }

  cargarMedicos() {

    const url = `${ base_url }/medicos`;
    return this.http.get<MedicoInterface>( url, this.headers )
              .pipe(
                map( (resp: MedicoInterface) => resp.medicos )
              );
  }

  getMedicoById( id: string){

    const url = `${ base_url }/medicos/${ id }`;
    return this.http.get<{ok: boolean, medico: Medico}>( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, medico: Medico}) => resp.medico )
              );

  }

  crearMedico( medico: { nombre: string, hospital: string }) {

    const url = `${ base_url }/medicos`;
    return this.http.post( url, medico , this.headers );

  }

  actualizarMedico( medico: Medico) {

    const url = `${ base_url }/medicos/${ medico._id }`;
    return this.http.put( url, medico , this.headers );

  }

  borrarMedico( _id: string ) {

    const url = `${ base_url }/medicos/${ _id }`;
    return this.http.delete<MedicoInterface>( url, this.headers );

  }

}
