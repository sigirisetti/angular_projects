import { Component, ViewChild, OnInit } from '@angular/core';
import { MassQuoteService } from '../mass-quotes-service'
import { MassQuote } from '../mass-quotes';
import { HttpClient } from '@angular/common/http';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as globals from '../../globals'

import { TfxStaticDataService} from '../../common/static-data/tfx-static-data.service'
import { TfxPriceSeriesComponent } from '../charts/tfx-price-series/tfx-price-series.component'
@Component({
  selector: 'app-tfx',
  templateUrl: './tfx.component.html',
  styleUrls: ['./tfx.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TfxComponent implements OnInit {

  @ViewChild(TfxPriceSeriesComponent, {static: false}) priceSeries;

  public tfxCcyPairs: Array<string> = new Array();
  displayedColumns = ["symbol", "spotDate", "marketBid", "marketAsk", "bid", "ask", "spread"];
  massQuotes: MassQuote[] = new Array();
  tfxPrices:  MassQuote[];
  expandedElement: MassQuote | null;

  constructor(private tfxStaticDataService: TfxStaticDataService, private massQuoteService : MassQuoteService) {}

  ngOnInit() {
    this.tfxStaticDataService.getTfxCurrencies().subscribe(
      (res: string[]) => {
        this.tfxCcyPairs = res;
        //console.log(res)
        for(let cp of res) {
          let q = new MassQuote();
          q.symbol = cp;
          this.massQuotes.push(q);
        }
      },
      error => console.log("TFX Currencies rest api error : " + error)
    );


    this.massQuoteService.messages.subscribe(msg => {
      for (let i = 0; i < this.massQuotes.length ; i++) {
        let q = this.massQuotes[i];
        if(q.symbol === msg.symbol) {
          this.massQuotes[i] = msg;
          break;
        }
      }
      this.tfxPrices = Object.assign([], this.massQuotes);
    });
  }

  onRowClicked(row) {
    this.expandedElement = this.expandedElement === row ? null : row;
    this.priceSeries.setCcyPair(row.symbol);
  }
}
