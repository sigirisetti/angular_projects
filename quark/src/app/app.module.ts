import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MenuListItemComponent } from './core/nav/menu-list-item/menu-list-item.component';
import { NavService } from './core/nav/nav.service';
import { TopNavComponent } from './core/nav/top-nav/top-nav.component';
import { ScheduledTaskComponent } from './common/config/scheduled-task/scheduled-task.component';
import { StocksComponent } from './samples/ws/stocks/stocks.component';
import { PageUnderConstructionComponent } from './common/page-under-construction/page-under-construction.component';

@NgModule({
  declarations: [
    AppComponent,
    PageUnderConstructionComponent,
    MenuListItemComponent,
    TopNavComponent,
    ScheduledTaskComponent,
    StocksComponent,
    PageUnderConstructionComponent
  ],
  imports: [
    BrowserModule,
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