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
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'Configuration',
      iconName: 'settings',
      route: '',
      children: [
        {
          displayName: 'Name Value Pair Config',
          iconName: 'star_rate',
          route: ''
        },
        {
          displayName: 'Manage Scheduled Tasks',
          iconName: 'star_rate',
          route: 'common/config/sch-task',
        },
        {
          displayName: 'Stock Quotes',
          iconName: 'star_rate',
          route: 'samples/ws/stocks',
        },
        {
          displayName: 'Manage Workflows',
          iconName: 'star_rate',
          route: '',
        },
        {
          displayName: 'Security',
          iconName: 'security',
          route: '',
          children: [
            {
              displayName: 'Organizations',
              iconName: 'domain',
              route: '/common/config/security/org/list-org'
            },
            {
              displayName: 'User Groups',
              iconName: 'group',
              route: ''
            },
            {
              displayName: 'Users',
              iconName: 'person',
              route: ''
            },
            {
              displayName: 'Permissions',
              iconName: 'star_rate',
              route: ''
            }
          ]
        }
      ]
    },
    {
      displayName: 'SA-CCR',
      iconName: 'view_list',
      children: [
        {
          displayName: 'Risk Charge Results',
          iconName: 'group',
          route: 'star_rate'
        },
        {
          displayName: 'Upload Trades & Collateral',
          iconName: 'star_rate',
          route: 'star_rate'
        },
        {
          displayName: 'SA-CCR Execution Report',
          iconName: 'star_rate',
          route: 'feedback'
        }
      ]
    },
    {
      displayName: 'SA-MR',
      iconName: 'view_list',
      route: '',
      children: [
        {
          displayName: 'Dashboard',
          iconName: 'dashboard',
          route: ''
        },
        {
          displayName: 'Risk Charge Results',
          iconName: 'view_list',
          route: '',
          children: [
            {
              displayName: 'Default View',
              iconName: 'star_rate',
              route: ''
            },
            {
              displayName: 'By PO',
              iconName: 'star_rate',
              route: ''
            },
            {
              displayName: 'By Asset Class',
              iconName: 'star_rate',
              route: ''
            },
            {
              displayName: 'Trade Level',
              iconName: 'star_rate',
              route: ''
            },
          ]
        },
        {
          displayName: 'Upload Trade Sensitivities',
          iconName: 'cloud_upload',
          route: ''
        },
        {
          displayName: 'Show Uploaded Sensitivities',
          iconName: 'star_rate',
          route: ''
        },
        {
          displayName: 'View Validation Messages',
          iconName: 'star_rate',
          route: ''
        },
        {
          displayName: 'Execution Report',
          iconName: 'star_rate',
          route: ''
        },
      ]
    },
    {
      displayName: 'Documentation',
      disabled: true,
      iconName: 'my_library_books',
      children: [
        {
          displayName: 'API Docs',
          iconName: 'star_rate',
          route: ''
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
