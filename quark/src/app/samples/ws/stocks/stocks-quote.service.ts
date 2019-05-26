import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from "rxjs";
import { WebsocketService } from "../../../websocket.service";
import { StockQuote } from './stock-quote';
import { map } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket' // for RxJS 6, for v5 use Observable.webSocket

@Injectable({
  providedIn: 'root'
})
export class StocksQuoteService {


  sub: Subscription;
  stockQuotes : StockQuote[];
  public messages: Subject<StockQuote[]> = new Subject();
  disconnected = false;

  constructor(wsService: WebsocketService) {
    //this.getMessages(wsService);
    this.getQuotes();
  }

  getQuotes() {
    let subject = webSocket('ws://localhost:8080/quark/name');
    subject.subscribe(
        (msg) => this.setData(msg),
        (err) => this.handleError(err),
        () => this.serverDisconnected()
      );
  }

  handleError(err) {
    console.log(err)
    this.reconnect()
  }

  serverDisconnected() {
    console.log("Server disconnected")
    this.disconnected = true;
    this.reconnect()
  }

  reconnect() {
    let that = this;
    setTimeout(function() {
      console.log("Trying to reconnect..")
      that.getQuotes();
    }, 2000);
  }

  setData(quotes) {
    this.disconnected = false;
    this.messages.next(quotes);
  }

  getMessages(wsService) {
    this.messages = <Subject<StockQuote[]>>wsService.connect("ws://localhost:8080/quark/name").pipe(map(
      (response: MessageEvent): StockQuote[] => {
        return JSON.parse(response.data);
      }
    ));  
  }

}
