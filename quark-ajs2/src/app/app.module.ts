import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MdToolbarModule, MdToolbarRow, MdCard } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import {Component} from '@angular/core';
import 'hammerjs';

import { AppComponent } from './app.component';
import { MsgDialogComponent } from './common/msg-dialog/msg-dialog.component';
import { PanelComponent } from './common/collapsible/panel/panel.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        MdToolbarModule,
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
