import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreaseByComponent } from './increase-by/increase-by.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { BaseChartDirective } from 'ng2-charts';



@NgModule({
  declarations: [
    IncreaseByComponent,
    DoughnutComponent
  ],
  exports: [
    IncreaseByComponent,
    DoughnutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective
  ]
})
export class ComponentsModule { }
