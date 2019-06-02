import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { MassQuoteService } from '../../mass-quotes-service'
import { Subscription, Subscriber } from 'rxjs';

@Component({
  selector: 'app-tfx-price-series',
  templateUrl: './tfx-price-series.component.html',
  styleUrls: ['./tfx-price-series.component.css']
})
export class TfxPriceSeriesComponent implements OnInit, OnDestroy {

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  private currentCcyPair: string;
  private priceTickSub: Subscription;
  private createTime = new Date();

  constructor(private massQuoteService: MassQuoteService) {
  }

  ngOnInit() {
    console.log("tfx price series component initialized : " + this.createTime)
  }

  ngOnDestroy(): void {
    console.log("tfx price series component destroyed!")
  }

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Mkt Bid' },
    { data: [], label: 'Mkt Ask' },
    { data: [], label: 'Bid' },
    { data: [], label: 'Ask' },
    { data: [], label: 'Spreads' }
  ];

  //public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartLabels: Label[] = [];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        display: true,
        //type: 'time',
      }],
      yAxes: [
        {
          id: 'y-axis',
          position: 'left',
          ticks: {
            fontColor: 'grey',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
    elements: {
      line: {
        tension: 0,
        fill: false
      }
    }
  };

  public lineChartColors: Color[] = [
    { // green
      backgroundColor: 'rgba(0,0,255,0.2)',
      borderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: 'rgba(0,0,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,0,255,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // green
      backgroundColor: 'rgba(0,0,255,0.2)',
      borderColor: 'rgba(0,0,255,1)',
      pointBackgroundColor: 'rgba(0,0,255,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,0,255,1)'
    },
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  /*
  public randomize(): void {
    for (let i = 0; i < this.lineChartData.length; i++) {
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        this.lineChartData[i].data[j] = this.generateNumber(i);
      }
    }
    this.chart.update();
  }

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }
  */

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public pushOne(tick) {
    let len = 0;
    this.lineChartData.forEach((x, i) => {
      x.data.slice(1).push(tick[i]);
      len = x.data.length;
      console.log("chart series data length : " + x.data.length)
    });
    if(this.lineChartLabels.length < len) {
      this.lineChartLabels.push(`T ${this.lineChartLabels.length}`);
    }
    this.chart.update();
  }

  /*
  public hideOne() {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }

  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
  */

  public setCcyPair(ccyPair) {
    if (this.currentCcyPair != null) {
      console.log("Un-subscribing price ticks for " + this.currentCcyPair)
      this.priceTickSub.unsubscribe();
    }
    this.getChartData(ccyPair);
    this.priceTickSub = this.subscribeToPriceTicks(ccyPair);
    this.currentCcyPair = ccyPair;
  }

  subscribeToPriceTicks(ccyPair) {
    const subscriber = Subscriber.create(
      (tick) => this.pushOne(tick),
      (error) => { console.log("Failed to subscribe for " + ccyPair + " price series") }
    );
    console.log("Subscribing price ticks for " + ccyPair)
    return this.massQuoteService.subscribeToPriceTicks(ccyPair, subscriber);
  }

  getChartData(ccyPair) {
    this.lineChartData = this.massQuoteService.getChartData(ccyPair);
    //console.log("Got initial chart data for " + ccyPair + " with length " + this.lineChartData[0].data.length)
  }
}
