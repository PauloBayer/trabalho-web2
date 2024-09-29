import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacoesFuncionarioComponent } from './solicitacoes-funcionario.component';

describe('SolicitacoesFuncionarioComponent', () => {
  let component: SolicitacoesFuncionarioComponent;
  let fixture: ComponentFixture<SolicitacoesFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitacoesFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitacoesFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
