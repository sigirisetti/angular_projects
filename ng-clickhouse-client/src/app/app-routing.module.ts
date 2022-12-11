import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PageUnderConstructionComponent } from './common/page-under-construction/page-under-construction.component';
import {StocksComponent} from './samples/ws/stocks/stocks.component'
import {SpotPriceComponent} from './pricing/spotPrice/spotPrice.component'
import { LineChartComponent } from './samples/charts/line-chart/line-chart.component'
import { ExpandableTableComponent } from './samples/ng-examples/expandable-table/expandable-table.component'
import {MemoryComponent} from './clickhouse/monitoring/memory/memory.component'



const routes: Routes = [
  {path: '', component: PageUnderConstructionComponent, pathMatch: 'full'},
  {path: 'clickhouse', children: [
    {path: 'monitoring', children: [
      {path: 'memory', component: MemoryComponent},
      {path: 'users', component: PageUnderConstructionComponent},
      {path: 'queries', component: PageUnderConstructionComponent},
      {path: 'merges', component: PageUnderConstructionComponent},
      {path: 'processes', component: PageUnderConstructionComponent},
    ]},
    {path: 'spot-prices-other', component: SpotPriceComponent}
  ]},
  {path: 'pricing', children: [
    {path: 'spot-prices', component: SpotPriceComponent},
    {path: 'spot-prices-other', component: SpotPriceComponent}
  ]},
  {path: 'market-data', children: [
    {path: 'forwardPoints', component: PageUnderConstructionComponent},
    {path: 'spot-prices-other', component: SpotPriceComponent}
  ]},
  {path: 'samples', children: [
    {path: 'ws', children: [
      {path: 'stocks', component: StocksComponent},
    ]},
    {path: 'charts', children: [
      {path: 'line-chart', component: LineChartComponent},
    ]},
    {path: 'ng-examples', children: [
      {path: 'expandable-table-rows', component: ExpandableTableComponent},
    ]},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
