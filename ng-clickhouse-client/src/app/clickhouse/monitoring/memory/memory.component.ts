import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

import { MonitoringService } from '../../monitoring.service';
import { ChDbTableSize } from 'src/app/common/model/ch-db-table-size';
import { SystemDisk } from 'src/app/common/model/ch-system-disk';
import { MessageDialogServiceService } from 'src/app/common/message-dialog-service.service';
import { GlobalStateService } from 'src/app/common/global-state.service';

@Component({
  selector: 'app-ch-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent {

  dbSelectionForm = new FormGroup({
    system: new FormControl(true),
    pae: new FormControl(true),
  });

  dataSource: ChDbTableSize[] = [];
  displayedColumns: string[] = ['table', 'database', 'size', 'rows', 'minDate', 'maxDate', 'days', 'avgDailySize'];

  constructor(
    public monitoringService: MonitoringService,
    public dialogService: MessageDialogServiceService,
    public globalStateService: GlobalStateService) {
  }

  onSubmit() {

    if (this.globalStateService.getSelectedEnv() == undefined) {
      const options = {
        title: 'Error',
        message: 'Clickhouse Env is needed to proceed further',
        cancelText: 'Cancel',
        confirmText: 'Ok'
      };

      this.dialogService.open(options);

      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          console.log("dialog closed");
        }
      });

      return;
    }

    console.log(this.dbSelectionForm.value);
    this.monitoringService.dbTableSize(true, true)
      .subscribe((data: ChDbTableSize[]) => {
        console.log("Got data of length : " + data.length);
        this.dataSource = data;
        this.barChartData.labels = [];

        let newLabels = [];
        let newNumbers = [];
        for(let r of data) {
          newLabels.push(r.table);
          newNumbers.push(r.size);
        }
        this.barChartData.labels = newLabels;
        this.barChartData.datasets[0].data = newNumbers;
        console.log(this.barChartData.datasets[0].data)
      });

      this.monitoringService.getSystemDisks()
      .subscribe((data: SystemDisk[]) => {
        this.pieChartData.datasets[0].data = [data[0].totalSpace - data[0].freeSpace, data[0].freeSpace];
      });
  }

  updateName() {
    console.log("Button clicked")
  }

  /**
   * Bar chart code
   */

  @ViewChild(BaseChartDirective) barChart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {data: [], label: 'Table' }
    ]
  };

  // events
  public barChartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public barChartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {}

  /**
   * Pie chart code
   */
  @ViewChild(BaseChartDirective) pieChart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ 'Used Memory', 'Free Memory'],
    datasets: [ {
      data: []
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ 
    DataLabelsPlugin
   ];

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position = this.pieChartOptions.plugins.legend.position === 'left' ? 'top' : 'left';
    }

    this.pieChart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display = !this.pieChartOptions.plugins.legend.display;
    }

    this.pieChart?.render();
  }

}
