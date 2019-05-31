import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { MassQuoteService } from '../mass-quotes-service'
import { MassQuote } from '../mass-quotes';
import { massQuotesUrl } from 'src/app/globals';
import { HttpClient } from '@angular/common/http';
import * as globals from '../../globals'

@Component({
  selector: 'app-tfx',
  templateUrl: './tfx.component.html',
  styleUrls: ['./tfx.component.css']
})
export class TfxComponent implements OnInit {

  public tfxCcyPairs: Array<string> = new Array();
  displayedColumns = ["symbol", "spotDate", "marketBid", "marketAsk", "bid", "ask", "spread"];
  massQuotes: MassQuote[] = new Array();
  tfxPrices:  MassQuote[];

  constructor(private massQuoteService : MassQuoteService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get(globals.restApiBase + "/tfxCurrencies").subscribe(
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

}
