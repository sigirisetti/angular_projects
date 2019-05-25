import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const socketIoConfig: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import { FourthComponent } from './fourth/fourth.component';
import {MenuListItemComponent} from './core/nav/menu-list-item/menu-list-item.component';
import { NavService } from './core/nav/nav.service';
import { TopNavComponent } from './core/nav/top-nav/top-nav.component';
import { ScheduledTaskComponent } from './common/config/scheduled-task/scheduled-task.component';
import { StocksComponent } from './samples/ws/stocks/stocks.component';                 //api

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    FourthComponent,
    MenuListItemComponent,
    TopNavComponent,
    ScheduledTaskComponent,
    StocksComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(socketIoConfig),
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    LayoutModule,
    AppRoutingModule
  ],
  providers: [NavService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}