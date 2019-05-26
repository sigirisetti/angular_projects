import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PageUnderConstructionComponent } from './common/page-under-construction/page-under-construction.component';
import {ScheduledTaskComponent} from './common/config/scheduled-task/scheduled-task.component'
import {StocksComponent} from './samples/ws/stocks/stocks.component'
import { ListOrgComponent } from './common/config/security/org/list-org/list-org.component'

const routes: Routes = [
  {path: '', component: PageUnderConstructionComponent, pathMatch: 'full'},
  {path: 'common', children: [
    {path: 'config', children: [
      {path: 'sch-task', component: ScheduledTaskComponent},
      {path: 'security', children: [
        {path: 'org', children: [
          {path: 'list-org', component: ListOrgComponent}
        ]},
        {path: 'stephen-fluin', children: [
          {path: 'what-up-web', component: PageUnderConstructionComponent}
        ]},
        {path: 'mike-brocchi', children: [
          {path: 'my-ally-cli', component: PageUnderConstructionComponent},
          {path: 'become-angular-tailer', component: PageUnderConstructionComponent}
        ]},
      ]}
    ]},
  ]},
  {path: 'samples', children: [
    {path: 'ws', children: [
      {path: 'stocks', component: StocksComponent},
    ]},
    {path: 'speakers', children: [
      {path: 'michael-prentice', children: [
        {path: 'material-design', component: PageUnderConstructionComponent}
      ]},
      {path: 'stephen-fluin', children: [
        {path: 'what-up-web', component: PageUnderConstructionComponent}
      ]},
      {path: 'mike-brocchi', children: [
        {path: 'my-ally-cli', component: PageUnderConstructionComponent},
        {path: 'become-angular-tailer', component: PageUnderConstructionComponent}
      ]},
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
