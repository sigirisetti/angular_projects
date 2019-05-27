import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PageUnderConstructionComponent } from './common/page-under-construction/page-under-construction.component';
import {StocksComponent} from './samples/ws/stocks/stocks.component'
import {TfxComponent} from './pricing/tfx/tfx.component'
import {TfxLargeComponent} from './pricing/tfx-large/tfx-large.component'

const routes: Routes = [
  {path: '', component: PageUnderConstructionComponent, pathMatch: 'full'},
  {path: 'pricing', children: [
    {path: 'tfx', component: TfxComponent},
    {path: 'tfx-large', component: TfxLargeComponent}
  ]},
  {path: 'samples', children: [
    {path: 'ws', children: [
      {path: 'stocks', component: StocksComponent},
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
