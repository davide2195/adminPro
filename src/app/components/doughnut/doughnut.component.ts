import { Component, Input } from '@angular/core';
import { Chart, ChartData, ChartType, registerables } from 'chart.js';
Chart.register(...registerables);



@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: ``
})
export class DoughnutComponent {

  @Input() title: string = 'No title';

  public changeTitle(){
    if ( this.title === '')
        this.title = 'Sin Titulo'
    }




  @Input('labels') doughnutChartLabels: string[] = ['label1','label2','label3' ];

  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: [ '#7FFFD4','#9400D3','#ff3355' ],
        hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
        hoverBorderColor:['#000000','#000000','#00000003']
      },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

}
