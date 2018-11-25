import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatToolbarRow, MatCard } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import {Component} from '@angular/core';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MsgDialogComponent } from './common/msg-dialog/msg-dialog.component';
import { MatDialogModule } from '@angular/material';
import { PanelComponent } from './common/collapsible/panel/panel.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MatToolbarModule,
        MatDialogModule,
        BrowserAnimationsModule,
        FlexLayoutModule
    ],
    providers: [],
    declarations: [
        AppComponent,
        MsgDialogComponent,
        PanelComponent
    ],
    exports : [],
    entryComponents: [
        MsgDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
