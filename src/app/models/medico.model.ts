import { Hospital } from "./hospital.model";

interface _MedicoUser {
  nombre: string,
  _id: string,
  img: string
}


export class Medico {

  constructor(
    public _id: string,
    public nombre?: string,
    public img?: string,
    public usuario?: _MedicoUser,
    public hospital?: Hospital
  ) {}

}

export interface MedicoInterface {
  ok: boolean,
  medicos: Medicos[],
  _id: string,

}

export interface Medicos {
  _id: string,
  nombre: string,
  usuario: _MedicoUser
}
