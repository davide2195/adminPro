import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard!',
      icon: 'mdi mdi-gauge',
      submenu:[
        { title: 'Main', url: '/' },
        { title: 'Chart', url: '/dashboard/grafica1' },
        { title: 'ProgresssBar', url: '/dashboard/progress' },
        { title: 'Promises', url: '/dashboard/promesas' },
        { title: 'rxjs', url: '/dashboard/rxjs' },

      ]
    }
  ]

  constructor() { }
}
