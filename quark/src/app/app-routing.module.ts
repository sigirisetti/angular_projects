import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FirstComponent} from './first/first.component';
import {SecondComponent} from './second/second.component';
import {ThirdComponent} from './third/third.component';
import {FourthComponent} from './fourth/fourth.component';
import {ScheduledTaskComponent} from './common/config/scheduled-task/scheduled-task.component'
import {StocksComponent} from './samples/ws/stocks/stocks.component'

const routes: Routes = [
  {path: '', component: FirstComponent, pathMatch: 'full'},
  {path: 'common', children: [
    {path: 'config', children: [
      {path: 'sch-task', component: ScheduledTaskComponent}
    ]},
    {path: 'speakers', children: [
      {path: 'michael-prentice', children: [
        {path: 'material-design', component: FirstComponent}
      ]},
      {path: 'stephen-fluin', children: [
        {path: 'what-up-web', component: SecondComponent}
      ]},
      {path: 'mike-brocchi', children: [
        {path: 'my-ally-cli', component: ThirdComponent},
        {path: 'become-angular-tailer', component: FourthComponent}
      ]},
    ]},
  ]},
  {path: 'samples', children: [
    {path: 'ws', children: [
      {path: 'stocks', component: StocksComponent},
    ]},
    {path: 'speakers', children: [
      {path: 'michael-prentice', children: [
        {path: 'material-design', component: FirstComponent}
      ]},
      {path: 'stephen-fluin', children: [
        {path: 'what-up-web', component: SecondComponent}
      ]},
      {path: 'mike-brocchi', children: [
        {path: 'my-ally-cli', component: ThirdComponent},
        {path: 'become-angular-tailer', component: FourthComponent}
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
