import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increase-by',
  templateUrl: './increase-by.component.html',
  styles: ``
})
export class IncreaseByComponent implements OnInit {

  ngOnInit(){
    this.btnClass = `btn ${ this.btnClass }`;
  }

  @Input()  progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output() exitValue: EventEmitter<number> = new EventEmitter();


  changeValue( value: number ) {

   if ( this.progress >= 100 && value >= 0 ) {
      this.exitValue.emit(100)
     return this.progress = 100;
   }


   if ( this.progress <= 0 && value < 0 ) {
      this.exitValue.emit(0)
     return this.progress = 0;
   }


   this.progress = this.progress + value;
   this.exitValue.emit( this.progress );

   return;
  }

  onChange ( newValue: number) {

    if( newValue >= 100 ) {
      this.progress = 100;
    } else if ( newValue <= 0){
      this.progress = 0;
    } else {
       this.progress = newValue;
    }


    this.exitValue.emit( this.progress );
  }

}
