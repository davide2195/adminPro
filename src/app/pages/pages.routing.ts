import { Routes, RouterModule, CanActivateFn } from '@angular/router';
import { NgModule } from '@angular/core';

import { authGuard, canMatch } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';




const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ authGuard ],
        canMatch:[ canMatch ],
        loadChildren: () => import('./child-routes.module').then( m => m.ChildRoutesModule )
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


