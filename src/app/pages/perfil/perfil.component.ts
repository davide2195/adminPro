import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``
})
export class PerfilComponent implements OnInit {


  public perfilForm!: FormGroup;
  public usuario: Usuario;
  public imagenSubir!: File;
  public imgTemp: any = '';

  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService ) {

    this.usuario = usuarioService.usuario;
  }


  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
    });

  }

  actualizarPerfil() {
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
     .subscribe( () => {
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado', 'Cambios realizados con éxito', 'success' );
     }, (err) => {
      Swal.fire('No han podido realizar los cambios', err.error.msg , 'error' );
      console.log();
     } );
  }

  cambiarImagen ( file: File ) {
    this.imagenSubir = file;

    if ( !file ) {
       this.imgTemp = null;
      }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {

    this.fileUploadService
     .actualizaFoto( this.imagenSubir, 'usuarios', this.usuario.uid! )
     .then( img => {
      this.usuario.img = img;
      Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success' );
    });

  }

}
