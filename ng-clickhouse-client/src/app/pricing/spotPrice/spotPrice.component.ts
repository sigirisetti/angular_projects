import { Component, ViewChildren, OnInit, ElementRef } from '@angular/core';
import { MassQuoteService } from '../mass-quotes-service'
import { MassQuote } from '../mass-quotes';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as globals from '../../globals'

import { Currency } from '../../common/static-data/currency';
import { StaticDataService } from '../../common/static-data/static-data.service'
import { LiveSeriesComponent } from '../charts/live-series/live-series.component'
import { NotificationService } from '../../common/notification.service'

@Component({
  selector: 'app-spot-price',
  templateUrl: './spotPrice.component.html',
  styleUrls: ['./spotPrice.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class SpotPriceComponent implements OnInit {

  @ViewChildren(LiveSeriesComponent) charts : any;
  private currentChart: LiveSeriesComponent| null;

  private currencies: Currency[];
  displayedColumns = ["symbol", "spotDate", "marketBid", "marketAsk", "bid", "ask", "spread"];
  massQuotes: MassQuote[] = new Array();
  spotPrices: MassQuote[];
  expandedElement: MassQuote | null;

  constructor(private staticDataService: StaticDataService, private massQuoteService: MassQuoteService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.staticDataService.getForwardCcyPairs().subscribe(
      (res: Currency[]) => {
        this.currencies = res;
        //console.log(res)
        for (let cp of res) {
          let q = new MassQuote();
          q.symbol = cp.symbol;
          this.massQuotes.push(q);
        }
      },
      error => {
        this.notificationService.error$.next("Forward CcyPair rest api error : " + error.message);
        console.log("Forward CcyPair rest api error : " + error)
      }
    );


    this.massQuoteService.messages.subscribe(msg => {
      for (let i = 0; i < this.massQuotes.length; i++) {
        let q = this.massQuotes[i];
        if (q.symbol === msg.symbol) {
          this.massQuotes[i] = msg;
          break;
        }
      }
      this.spotPrices = Object.assign([], this.massQuotes);
    });
  }

  onRowClicked(row: any) {
    this.expandedElement = this.expandedElement === row ? null : row;
    let selected = null;
    for (let chart of this.charts) {
      if(chart.ccyPair === row.symbol) {
        chart.render();
        selected = chart;
      }
    }
    if(this.currentChart != null) {
      //console.log(this.currentChart)
      this.currentChart.stopRendering();
    }
    this.currentChart = selected;
  }

  getSuggestedMin(sym: string) : number {
    for(let cp of this.currencies) {
      if(cp.symbol === sym) {
        return cp.chartLowerBound;
      }
    }
    return 0;
  }

  getSuggestedMax(sym : string) : number {
    for(let cp of this.currencies) {
      if(cp.symbol === sym) {
        return cp.chartUpperBound;
      }
    }
    return 10000;
  }
}
