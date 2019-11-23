import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarReservaComponent } from './administrar-reserva.component';

describe('AdministrarReservaComponent', () => {
  let component: AdministrarReservaComponent;
  let fixture: ComponentFixture<AdministrarReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
