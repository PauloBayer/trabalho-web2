import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarOrcamentosComponent } from './mostrar-orcamentos.component';

describe('MostrarOrcamentosComponent', () => {
  let component: MostrarOrcamentosComponent;
  let fixture: ComponentFixture<MostrarOrcamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarOrcamentosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarOrcamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
