import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { default as Annotation } from 'chartjs-plugin-annotation';
import { MassQuoteService } from '../../mass-quotes-service'
import { Subscription, Subscriber } from 'rxjs';
import { TfxStaticDataService } from '../../../common/static-data/tfx-static-data.service'
import { Currency } from '../../../common/static-data/currency';
import * as globals from '../../../globals'

@Component({
  selector: 'app-tfx-price-series',
  templateUrl: './tfx-price-series.component.html',
  styleUrls: ['./tfx-price-series.component.css']
})
export class TfxPriceSeriesComponent implements OnInit, OnDestroy {

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  @Input()
  public ccyPair = "";

  private priceTickSub: Subscription;

  public lineChartLegend = true;

  public lineChartType: ChartType = 'line';

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Mkt Bid',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Mkt Ask',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Bid',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Ask',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
  };

  public lineChartLabels: string[] = [];
  public lineChartLabelsInternal: string[] = [];

  constructor(private tfxStaticDataService: TfxStaticDataService, private massQuoteService: MassQuoteService) {
    Chart.register(Annotation)
  }

  ngOnInit() {
    //console.log("tfx price series component initialized : " + this.createTime)
  }

  ngOnDestroy(): void {
    //console.log("tfx price series component destroyed!")
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: {
        display: true,
        ticks: {
          color: 'black',
        }
      },
      yAxes: 
        {
          position: 'left',
          ticks: {
            color: 'black',
          }
        }
      
    },
    plugins :{
      legend: {display: true},
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x-axis-0',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold'
              }
            }
          },
        ],
      },
    },
    elements: {
      line: {
        tension: 0,
        fill: false
      }
    }
  };


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public render() {
    this.getChartData(this.ccyPair);
    this.priceTickSub = this.subscribeToPriceTicks(this.ccyPair);
  }

  public stopRendering() {
    this.priceTickSub.unsubscribe();
  }

  public pushOne(tick: any) {
    this.lineChartData.datasets.forEach((x, i) => {
      if (x.data.length == globals.MAX_SERIES_LENGTH) {
        x.data.slice(1);
      }
      x.data.push(tick[i]);
    })
    if (this.lineChartLabelsInternal.length < globals.MAX_SERIES_LENGTH) {
      this.lineChartLabelsInternal.push(`T-${this.lineChartLabelsInternal.length}`);
    }
    this.lineChartLabels = this.lineChartLabelsInternal.slice().reverse();
    this.chart.update();
  }

  subscribeToPriceTicks(ccyPair: string) : any {
    const subscriber = Subscriber.create(
      (tick) => this.pushOne(tick),
      (error) => { console.log("Failed to subscribe for " + ccyPair + " price series") }
    );
    console.log("Subscribing price ticks for " + ccyPair)
    return this.massQuoteService.subscribeToPriceTicks(ccyPair, subscriber);
  }

  getChartData(ccyPair: string) {
    this.lineChartData = this.massQuoteService.getChartData(ccyPair);
    let len = this.lineChartData.datasets[0].data.length;
    if (this.lineChartLabelsInternal.length < globals.MAX_SERIES_LENGTH) {
      this.lineChartLabelsInternal = [];
      for (let i = 0; i < len; i++) {
        this.lineChartLabelsInternal.push(`T-${i}`);
      }
      this.lineChartLabels = this.lineChartLabelsInternal.slice().reverse();
    }
    //console.log("Got initial chart data for " + ccyPair + " with length " + this.lineChartData[0].data.length)
  }
}
