import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

import { MonitoringService } from '../../monitoring.service';
import { ChDbTableSize } from 'src/app/common/model/ch-db-table-size';
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
  }

  updateName() {
    console.log("Button clicked")
  }

  /**
   * Charting code
   */

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

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
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {}
}
