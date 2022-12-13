import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


import { MonitoringService } from '../../monitoring.service';
import { ChDbTableSize } from 'src/app/common/model/ch-db-table-size';

@Component({
  selector: 'app-ch-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent {

  data: ChDbTableSize[];

  dbSelectionForm = new FormGroup({
    system: new FormControl(true),
    pae: new FormControl(true),
  });


  constructor(public monitoringService: MonitoringService) { 
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.dbSelectionForm.value);
    this.monitoringService.dbTableSize(true, true)
    .subscribe((data: ChDbTableSize[]) => {
      this.data = data;
      console.log(this.data);
  });
  }

  updateName() {
    console.log("Button clicked")
  }
}
