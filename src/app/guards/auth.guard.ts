import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

export const canMatch: CanMatchFn = () => {

  const usuarioService = inject(UsuarioService);
const router         = inject(Router);

  usuarioService.validarToken()

  return usuarioService.validarToken()
   .pipe(
    tap( estaAutenticado => {
      if ( !estaAutenticado ) {
        router.navigateByUrl('/login');
      }
    })
   );

}



export const authGuard: CanActivateFn = () => {

  const usuarioService = inject(UsuarioService);
const router         = inject(Router);

  usuarioService.validarToken()

  return usuarioService.validarToken()
   .pipe(
    tap( estaAutenticado => {
      if ( !estaAutenticado ) {
        router.navigateByUrl('/login');
      }
    })
   );

};
