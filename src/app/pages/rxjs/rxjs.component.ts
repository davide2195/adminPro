import { Component, OnDestroy } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: ``
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

  //   this.returnObservable().pipe(
  //     retry()
  //   ).subscribe(
  //     value => console.log('subs:', value),
  //     error => console.warn('Error', error ),
  //     () => console.info('obs terminado')
  //  );

  this.intervalSubs = this.returnInterval().subscribe( console.log )

}
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  returnInterval(): Observable<number> {

    return interval(500)
                      .pipe(
                        map( value => value + 1 ),
                        filter( value => ( value % 2 === 0) ? true: false ),
                        // take(10),
                      );
  }



  returnObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>( observer => {


      const interval = setInterval(() => {

        i++;
        observer.next(i);

        if ( i === 4 ) {
          clearInterval( interval );
          observer.complete();
        }

        if ( i === 2 ) {
          observer.error('i llego al valor de 2');
        }

      }, 1000 );
    });

  }

}
