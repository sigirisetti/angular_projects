import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {VERSION} from '@angular/material';
import {NavItem} from './core/nav/nav-item';
import {NavService} from './core/nav/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appDrawer', { static: true }) appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'Pricing',
      iconName: 'euro',
      route: '',
      children: [
        {
          displayName: 'TFX',
          iconName: 'star_rate',
          route: 'pricing/tfx'
        },
        {
          displayName: 'TFX Large',
          iconName: 'star_rate',
          route: 'pricing/tfx-large',
        },
      ]
    },
    {
      displayName: 'Samples',
      iconName: 'view_list',
      children: [
        {
          displayName: 'Stock Quotes',
          iconName: 'money',
          route: 'samples/ws/stocks'
        },
        {
          displayName: 'Line Chart',
          iconName: 'star_rate',
          route: 'samples/charts/line-chart'
        },
        {
          displayName: 'Expandable Table Rows',
          iconName: 'star_rate',
          route: 'samples/ng-examples/expandable-table-rows'
        }
      ]
    }
  ];

  constructor(private navService: NavService) {
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
