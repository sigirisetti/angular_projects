import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtlUsageComponent } from './ttl-usage.component';

describe('TtlUsageComponent', () => {
  let component: TtlUsageComponent;
  let fixture: ComponentFixture<TtlUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtlUsageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtlUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
