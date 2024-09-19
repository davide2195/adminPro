import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaseByComponent } from './increase-by/increase-by.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { BaseChartDirective } from 'ng2-charts';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    IncreaseByComponent,
    DoughnutComponent,
    ModalImagenComponent
  ],
  exports: [
    IncreaseByComponent,
    DoughnutComponent,
    ModalImagenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective
  ]
})
export class ComponentsModule { }
