import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgDialogComponent } from './msg-dialog.component';

describe('MsgDialogComponent', () => {
  let component: MsgDialogComponent;
  let fixture: ComponentFixture<MsgDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsgDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
