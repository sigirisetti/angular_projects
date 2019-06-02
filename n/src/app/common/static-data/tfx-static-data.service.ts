import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as globals from '../../globals'

@Injectable({
  providedIn: 'root'
})
export class TfxStaticDataService {

  constructor(private http: HttpClient) { 
  }

  getTfxCurrencies() {
    return this.http.get(globals.restApiBase + "/tfxCurrencies")
  }
}
