import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import {NavItem} from './core/nav/nav-item';
import {NavService} from './core/nav/nav.service';
import {NotificationService} from './common/notification.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { MessageDialogComponent } from './common/message-dialog/message-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appDrawer', { static: true }) public appDrawer!: ElementRef;
  navItems: NavItem[] = [
    {
      displayName: 'Clickhouse Monitoring',
      iconName: 'monitoring',
      children: [
        {
          displayName: 'Memory Usage',
          iconName: 'memory',
          route: 'clickhouse/monitoring/memory'
        },
        {
          displayName: 'TTL Usage',
          iconName: 'hourglass_top',
          route: 'clickhouse/monitoring/ttlUsage'
        },
        {
          displayName: 'Logged In Users',
          iconName: 'person',
          route: 'clickhouse/monitoring/users'
        },
        {
          displayName: 'Current / Query History',
          iconName: 'query_stats',
          route: 'clickhouse/monitoring/queries'
        },
        {
          displayName: 'Active Processes',
          iconName: 'run_circle',
          route: 'clickhouse/monitoring/processes'
        },
        {
          displayName: 'Active Merges',
          iconName: 'merge',
          route: 'clickhouse/monitoring/merges'
        },
      ]
    },
    {
      displayName: 'PAE',
      iconName: 'currency_exchange',
      route: '',
      children: [
        {
          displayName: 'Agency Spot Prices',
          iconName: 'price_change',
          route: 'pricing/spot-prices'
        },
        {
          displayName: 'Forward Points',
          iconName: 'scoreboard',
          route: 'market-data/forwardPoints',
        },
      ]
    },
    {
      displayName: 'Test Pages',
      iconName: 'school',
      children: [
        {
          displayName: 'Stock Quotes',
          iconName: 'money',
          route: 'samples/ws/stocks'
        },
        {
          displayName: 'Line Chart',
          iconName: 'stacked_line_chart',
          route: 'samples/charts/line-chart'
        },
        {
          displayName: 'Expandable Table Rows',
          iconName: 'expand_content',
          route: 'samples/ng-examples/expandable-table-rows'
        }
      ]
    }
  ];

  constructor(
    private dialog: MatDialog,
    private navService: NavService, 
    private snackBar: MatSnackBar, 
    private notificationService: NotificationService) {

      this.notificationService.notification$.subscribe(message => {
        this.snackBar.open(message, "Close", {
          duration: 3000,
          panelClass: ['blue-snackbar']
        });
      });
      this.notificationService.error$.subscribe(message => {
        this.snackBar.open(message, "Close", {
          duration: 3000,
          panelClass: ['red-snackbar']
        });
      });
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(MessageDialogComponent, dialogConfig);
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
