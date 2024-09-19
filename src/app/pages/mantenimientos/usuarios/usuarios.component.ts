import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Usuario } from '../../../models/usuario.model';

import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public imgSubs!: Subscription;
  public desde: number = 0;
  public cargando: boolean = true;

  constructor( private usuarioService: UsuarioService,
               private busquedasService: BusquedasService,
               private modaImagenService: ModalImagenService
   ) {}
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.imgSubs = this.modaImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
    .subscribe( img => {
      this.cargarUsuarios()
    });
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios( this.desde )
    .subscribe( ({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    });
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;


    if( this.desde < 0 ) {
      this.desde = 0;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
       this.usuarios = this.usuariosTemp
       return;
    }

    this.busquedasService.buscar( 'usuarios', termino )
        .subscribe( coleccion => {

         this.usuarios = coleccion;
        });

  }

  eliminarUsuario( usuario: Usuario ) {

    if ( usuario.uid === this.usuarioService.uid ) {
      Swal.fire('Error', 'No puede borrarse a si mismo', 'error')
      return;
    }

    Swal.fire({
      title: '¿Desea borrar este usuario?',
      text: `Está a punto de borrar a ${ usuario.nombre }`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, borralo"
    }).then((result) => {
      if (result.value) {

        this.usuarioService.eliminarUsuario( usuario )
         .subscribe( resp => {

            this.cargarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre } fue eliminado correctamente`,
              'success'
            );
        });
      }
    });

  }

  cambiarRole( usuario:Usuario) {

    this.usuarioService.guardarUsuario(usuario)
     .subscribe( resp => {
      console.log(resp);
     })
  }


  abrirModal( usuario: Usuario ) {
    console.log(usuario);
    this.modaImagenService.abrirModal('usuarios', usuario.uid! , usuario.img );
  }

}



