import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
        this.dataSource = data;
        console.log("Got data of length : " + data.length);
      });
  }

  updateName() {
    console.log("Button clicked")
  }
}
