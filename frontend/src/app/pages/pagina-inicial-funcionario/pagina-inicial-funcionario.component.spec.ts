import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaInicialFuncionarioComponent } from './pagina-inicial-funcionario.component';

describe('PaginaInicialFuncionarioComponent', () => {
  let component: PaginaInicialFuncionarioComponent;
  let fixture: ComponentFixture<PaginaInicialFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaInicialFuncionarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaInicialFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
