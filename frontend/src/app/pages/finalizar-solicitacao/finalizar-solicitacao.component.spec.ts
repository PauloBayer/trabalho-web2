import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizarSolicitacaoComponent } from './finalizar-solicitacao.component';

describe('FinalizarSolicitacaoComponent', () => {
  let component: FinalizarSolicitacaoComponent;
  let fixture: ComponentFixture<FinalizarSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalizarSolicitacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalizarSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
