import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import * as globals from '../../../../../globals';
import { Org } from "../org"
import { Observable } from "rxjs";


@Component({
  selector: 'app-list-org',
  templateUrl: './list-org.component.html',
  styleUrls: ['./list-org.component.css']
})
export class ListOrgComponent implements OnInit {

  displayedColumns = ["id", "name", "active"];

  private orgUrl = "/services/security/listOrg"
  private organisations: Observable<Org[]>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.organisations = this.getOrganisations();
  }

  getOrganisations(): Observable<any> {
    return this.http.get<Org[]>(`${globals.restApiBase}${this.orgUrl}`);
  }
}
