import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googlebtn') googleBtn!: ElementRef;

  public formSubmitted = false;

   loginForm: FormGroup;


  constructor(
      private router: Router,
      private fb: FormBuilder,
      private usuarioService: UsuarioService,
      private ngZone: NgZone
    )
    {
       this.loginForm = this.fb.group({
            email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
            password: ['', Validators.required ],
            remember: [ false ]
      });
    }
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit (){

    google.accounts.id.initialize({
      client_id: '133857938445-9bq372g616req372afj7mbg07aj9tkfb.apps.googleusercontent.com',
      callback: ( response: any ) => this.handleCredentialResponse( response )
    });

    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential )
      .subscribe( resp => {
        // console.log( { login: resp })
        this.router.navigateByUrl('/');
      })

  }



  login() {

    this.usuarioService.login( this.loginForm.value )
    .subscribe({
      next: resp => {
        if( this.loginForm.get('remember')?.value ){
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else{
          localStorage.removeItem('email');
        }

        // Navegar al Dashboard
        this.ngZone.run( () => {
          this.router.navigateByUrl('/');
        });


      }, error: err => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error');
      }
    })
  }

}
