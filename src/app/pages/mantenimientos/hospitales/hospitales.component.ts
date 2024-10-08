import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';

import Swal from 'sweetalert2';

import { Hospital } from '../../../models/hospital.model';

import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: ``
})
export class HospitalesComponent implements OnInit, OnDestroy{


  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];

  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor( private hospitalService: HospitalService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService
  ){}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }


  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
  .subscribe( img => {this.cargarHospitales()
  });
  }

  cargarHospitales() {

    this.cargando = true;
    this.hospitalService.cargarHospitales()
     .subscribe( hospitales => {
      this.cargando = false;
      this.hospitales = hospitales;
     })
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
       return this.cargarHospitales();
    }

    this.busquedasService.buscar( 'hospitales', termino )
        .subscribe( resp => {
         this.hospitales = resp as Hospital[] ;
        })

        return this.hospitales;

  }

  guardarCambios( hospital: Hospital) {

    this.hospitalService.actualizarHospital( hospital._id, hospital.nombre! )
     .subscribe( resp => {
        Swal.fire( 'Actualizado', hospital.nombre, 'success')
     });
  }

   borrarHospital ( hospital: Hospital) {

    this.hospitalService.borrarHospital( hospital._id )
     .subscribe( resp => {
        this.cargarHospitales();
        Swal.fire( 'Borrado', hospital.nombre, 'success')
     });
  }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title:"Crear hospital",
      text:"Ingrese el nombre del nuevo hospital",
      input: "text",
      inputPlaceholder: "Nombre del hospital",
      showCancelButton: true
    })

    if( value!.trim().length > 0) {
       this.hospitalService.crearHospital( value! )
        .subscribe( (resp:any) => {
          this.hospitales.push( resp.hospital)
        });

    }
  }

  abrirModal(hospital: Hospital) {

    this.modalImagenService.abrirModal('hospitales', hospital._id , hospital.img );

    }



}
