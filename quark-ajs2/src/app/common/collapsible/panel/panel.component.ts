import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'panel',
    styles: [
    `.hide {
      display: none;
    },`
    ],
    template: `
      <div class="card" *ngIf="title">
        <div class="card-header" (click)="toggle()">{{title}}  </div>
        <div  class="card-block" [ngClass]="{hide: !opened}"><ng-content></ng-content></div>
      </div>`,
    inputs: ['title']
})

export class PanelComponent {
    opened: Boolean = false;
    toggle() {
        this.opened = !this.opened;
    }
}
