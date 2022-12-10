import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotPriceComponent } from './spotPrice.component';

describe('SpotPriceComponent', () => {
  let component: SpotPriceComponent;
  let fixture: ComponentFixture<SpotPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
