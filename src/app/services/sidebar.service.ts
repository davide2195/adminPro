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
        { title: 'ProgresssBar', url: '/dashboard/progress' },
        { title: 'Chart', url: '/dashboard/grafica1' },
      ]
    }
  ]

  constructor() { }
}
