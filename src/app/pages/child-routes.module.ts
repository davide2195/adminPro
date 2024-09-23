import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { BusquedaComponent } from './busqueda/busqueda.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { adminGuard } from '../guards/admin.guard';


const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard'}  },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings'}},
  { path: 'buscar/:termino', component: BusquedaComponent, data: { title: 'Busquedas'}},
  { path: 'grafica1', component: Grafica1Component, data: { title: 'Chart'} },
  { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de usuario'} },
  { path: 'progress', component: ProgressComponent, data: { title: 'Progress'} },
  { path: 'promesas', component: PromesasComponent, data: { title: 'Promises'} },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs'} },

  // Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento de hospitales'} },
  { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento de medicos'} },
  { path: 'medicos/:id', component: MedicoComponent, data: { title: 'Mantenimiento de medicos'} },

  // Rutas de Admin
  { path: 'usuarios', canActivate: [ adminGuard ] , component: UsuariosComponent, data: { title: 'Mantenimiento de usuarios'} },
]



@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
