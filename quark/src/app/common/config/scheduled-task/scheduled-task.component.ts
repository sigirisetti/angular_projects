import { Component, OnInit } from '@angular/core';
import {ScheduledTask} from '../scheduled-task'


const SCHTASKS: ScheduledTask[] = [
  {name: 'EOD', enabled: true, cronExpression: '0 5 0 0 *', process: 'Test1'},
  {name: 'SOD', enabled: true, cronExpression: '0 5 0 0 *', process: 'Test2'},
]


@Component({
  selector: 'app-scheduled-task',
  templateUrl: './scheduled-task.component.html',
  styleUrls: ['./scheduled-task.component.css']
})
export class ScheduledTaskComponent implements OnInit {

  displayedColumns = ["name", "enabled", "cronExpression", "process"];
  dataSource = SCHTASKS;

  constructor() { }

  ngOnInit() {
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

}
