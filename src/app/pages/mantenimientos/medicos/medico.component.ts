import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Medico } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';

import { MedicoService } from '../../../services/medico.service';
import { HospitalService } from '../../../services/hospital.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';



@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: ``
})
export class MedicoComponent implements OnInit{

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];

  public medicoSeleccionado: Hospital | undefined;
  public hospitalSeleccionado: Medico | undefined;


  constructor( private fb: FormBuilder,
               private hospitalService: HospitalService,
               private medicoService: MedicoService,
               private router: Router,
               private activatedRoute: ActivatedRoute
   ){}

  ngOnInit(): void {

    this.activatedRoute.params
      .subscribe  ( ({ id }) => { this.cargarMedico(id) });



    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required ],
      hospital: ['', Validators.required ]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe( hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find( hosp => hosp._id === hospitalId )
      })

  }

  cargarMedico( id: string){

    if( id === 'nuevo') {
      return;
    }

    this.medicoService.getMedicoById( id )
     .pipe(delay(100))
     .subscribe( (medico: any) => {

      if ( !medico ) {
        this.router.navigateByUrl(`/dashboard/medicos`);
        return;
      }
      const { nombre, hospital: { _id } } = medico;
      this.medicoSeleccionado = medico;
      this.medicoForm.setValue({ nombre, hospital: _id });
     });

  }

  cargarHospitales() {

    this.hospitalService.cargarHospitales()
     .subscribe( (hospitales: Hospital[]) => {
      this.hospitales = hospitales;
     })
  }

  guardarMedico() {

    const { nombre } = this.medicoForm.value;

    if( this.medicoSeleccionado) {
      // Actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico ( data )
       .subscribe( resp => {
        Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success');
       })

    }else{
      // Crear
      this.medicoService.crearMedico( this.medicoForm.value )
        .subscribe( (resp: any) => {
          Swal.fire('Creado', `${ nombre } creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medicos/${ resp.medico._id }`)
        })
    }


  }


}
