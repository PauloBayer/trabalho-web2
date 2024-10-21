import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarSolicitacoesComponent } from './gerenciar-solicitacoes.component';

describe('GerenciarSolicitacoesComponent', () => {
  let component: GerenciarSolicitacoesComponent;
  let fixture: ComponentFixture<GerenciarSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarSolicitacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
