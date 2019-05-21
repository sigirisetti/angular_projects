import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledTaskComponent } from './scheduled-task.component';

describe('ScheduledTaskComponent', () => {
  let component: ScheduledTaskComponent;
  let fixture: ComponentFixture<ScheduledTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
