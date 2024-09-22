import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';

import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor( private http: HttpClient ) { }

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

  private transformarUsuarios( coleccion: any[]): Usuario[]{

    return coleccion.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
    );
  }

  private transformarHospitales( coleccion: any[]): Hospital[]{

    return coleccion;
  }

  private transformarMedicos( coleccion: any[]): Medico[]{

    return coleccion;
  }

  buscar(
     tipo: 'usuarios'|'medicos'|'hospitales',
     termino: string,
    ) {

    const url = `${ base_url }/todo/coleccion/${ tipo }/${ termino }`;
     return this.http.get<any[]>( url, this.headers )
      .pipe(
        map( (resp: any) => {

          switch ( tipo ) {
            case 'usuarios':
              return this.transformarUsuarios( resp.coleccion )

            case 'hospitales':
              return this.transformarHospitales( resp.coleccion )

              case 'medicos':
                return this.transformarMedicos( resp.coleccion )


            default:
              return[];
          }

        })
      );

  }
}
