import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';

import {A11yModule} from '@angular/cdk/a11y';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';


import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageUnderConstructionComponent } from './common/page-under-construction/page-under-construction.component';
import { SnackBarComponent } from './common/snack-bar/snack-bar.component';
import { MenuListItemComponent } from './core/nav/menu-list-item/menu-list-item.component';
import { TopNavComponent } from './core/nav/top-nav/top-nav.component';
import { LineChartComponent } from './samples/charts/line-chart/line-chart.component';
import { ExpandableTableComponent } from './samples/ng-examples/expandable-table/expandable-table.component';
import { StocksComponent } from './samples/ws/stocks/stocks.component';
import { TfxPriceSeriesComponent } from './pricing/charts/tfx-price-series/tfx-price-series.component';
import { TfxComponent } from './pricing/tfx/tfx.component';
import { TfxLargeComponent } from './pricing/tfx-large/tfx-large.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavService } from './core/nav/nav.service';
import { TfxStaticDataService } from './common/static-data/tfx-static-data.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    NgChartsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    PageUnderConstructionComponent,
    SnackBarComponent,
    MenuListItemComponent,
    TopNavComponent,
    LineChartComponent,
    ExpandableTableComponent,
    StocksComponent,
    TfxPriceSeriesComponent,
    TfxComponent,
    TfxLargeComponent
  ],
  exports: [
    AppComponent,
    PageUnderConstructionComponent,
    SnackBarComponent,
    MenuListItemComponent,
    TopNavComponent,
    LineChartComponent,
    ExpandableTableComponent,
    StocksComponent,
    TfxPriceSeriesComponent,
    TfxComponent,
    TfxLargeComponent
  ],
  providers: [
    NavService,
    TfxStaticDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
