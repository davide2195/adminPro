import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { every, filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public title!: string;
  public titleSubs$: Subscription;

  constructor( private router: Router ) {

    this.titleSubs$ = this.getDataRuta()
                      .subscribe( ({title}) => {
                        this.title = title;
                        document.title = `Dashboar, ${ title }`;
                      });
   }
  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }


  getDataRuta() {

    return  this.router.events
    .pipe(
      filter( (event): event is ActivationEnd => event instanceof ActivationEnd ),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data ),
    );

  }
}



