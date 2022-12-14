import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as globals from '../globals'

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {

  constructor(private http: HttpClient) {
  }

  dbTableSize(system: boolean, pae: boolean): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    let params = new HttpParams().append("system", system).set("pae", pae);
    return this.http.get(globals.dbTableSize, { headers, params });
  }

  getSystemDisks(): Observable<any> {
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    let params = new HttpParams();
    return this.http.get(globals.getSystemDisks, { headers, params });
  }
}
