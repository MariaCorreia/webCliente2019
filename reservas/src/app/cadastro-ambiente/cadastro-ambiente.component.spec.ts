import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAmbienteComponent } from './cadastro-ambiente.component';

describe('CadastroAmbienteComponent', () => {
  let component: CadastroAmbienteComponent;
  let fixture: ComponentFixture<CadastroAmbienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAmbienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
