import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduled-task',
  templateUrl: './scheduled-task.component.html',
  styleUrls: ['./scheduled-task.component.css']
})
export class ScheduledTaskComponent implements OnInit {

  displayedColumns = ["name", "enabled", "crossExpression", "process"];

  constructor() { }

  ngOnInit() {
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

}
