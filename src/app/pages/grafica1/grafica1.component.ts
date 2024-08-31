import { Component } from '@angular/core';
import { ChartData } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',

})
export class Grafica1Component {

  public labels1: string[] = [ 'Cellphones', 'TVs','Pants' ];

  data1: ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [
      { data: [ 350, 450, 100 ],
        backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ],
        hoverBackgroundColor: [ '#6857E6', '#009FEE', '#F02059' ]
      }
    ]
  };








}






