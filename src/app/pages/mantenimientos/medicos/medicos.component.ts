import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { Medico } from '../../../models/medico.model';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: ``
})
export class MedicosComponent implements OnInit, OnDestroy{

  public medicos: Medico[] = [];

  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor( private medicoService: MedicoService,
               private modalImagenService: ModalImagenService,
               private busquedasService: BusquedasService
  ){

  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
     .pipe( delay(100) )
     .subscribe( img => this.cargarMedicos() );


  }

  cargarMedicos() {

    this.cargando = true;
    this.medicoService.cargarMedicos()
     .subscribe( medicos => {
      this.cargando = false;
      this.medicos = medicos;
      console.log(medicos)
     })
  }

  buscar( termino: string ) {
    if ( termino.length === 0 ) {
       return this.cargarMedicos();
    }

    this.busquedasService.buscar( 'medicos', termino )
        .subscribe( resp => {
         this.medicos = resp as Medico[] ;
        })

        return this.medicos;
  }

  // guardarCambios( medico: Medico) {

  //   this.medicoService.actualizarMedico( medico._id, medico.nombre! )
  //    .subscribe( resp => {
  //       Swal.fire( 'Actualizado', medico.nombre, 'success')
  //    });
  // }

   borrarMedico ( medico: Medico) {

    Swal.fire({
      title: '¿Desea borrar este medico?',
      text: `Está a punto de borrar a ${ medico.nombre }`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, borralo"
    }).then((result) => {
      if (result.value) {

        this.medicoService.borrarMedico( medico._id )
         .subscribe( resp => {

            this.cargarMedicos();
            Swal.fire(
              'Medico borrado',
              `${ medico.nombre } fue eliminado correctamente`,
              'success'
            );
        });
      }
    });
  }
  // async abrirSweetAlert() {
  //   const { value = '' } = await Swal.fire<string>({
  //     title:"Crear medico",
  //     text:"Ingrese el nombre del nuevo medico",
  //     input: "text",
  //     inputPlaceholder: "Nombre del medico",
  //     showCancelButton: true
  //   })

  //   if( value!.trim().length > 0) {
  //      this.medicoService.crearMedico(  )
  //       .subscribe( (resp:any) => {
  //         this.medicos.push( resp.medico)
  //       });

  //   }
  // }

  abrirModal(medico: Medico) {

    this.modalImagenService.abrirModal('medicos', medico._id , medico.img );

    }

}
