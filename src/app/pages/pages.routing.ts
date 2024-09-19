import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { authGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ authGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { title: 'Dashboard'}  },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress'} },
            { path: 'grafica1', component: Grafica1Component, data: { title: 'Chart'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings'}},
            { path: 'promesas', component: PromesasComponent, data: { title: 'Promises'} },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RxJs'} },
            { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de usuario'} },

            // Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { title: 'Usuario de aplicación'} },
            { path: 'hospitales', component: HospitalesComponent, data: { title: 'Hospitales de aplicación'} },
            { path: 'medicos', component: MedicosComponent, data: { title: 'Médicos de aplicación'} },
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


