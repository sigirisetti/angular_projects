import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MsgDialogComponent } from './common/msg-dialog/msg-dialog.component';
import { PanelComponent } from './common/collapsible/panel/panel.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    ngOnInit(): void {
    }

    quark: Quark = {
        title : "Quark",
        version : "0.1"
    }

    constructor(public dialog: MatDialog) {
    }

    openDialog() {
        this.dialog.open(MsgDialogComponent, {
            height: '200px',
            width: '600px',
        });
    }
}

export class Quark {
    title: string;
    version: string;
}