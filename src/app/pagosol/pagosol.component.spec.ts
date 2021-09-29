import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagosolComponent } from './pagosol.component';

describe('PagosolComponent', () => {
  let component: PagosolComponent;
  let fixture: ComponentFixture<PagosolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagosolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagosolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
