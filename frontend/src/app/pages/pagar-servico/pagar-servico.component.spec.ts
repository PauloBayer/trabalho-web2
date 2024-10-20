import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarServicoComponent } from './pagar-servico.component';

describe('PagarServicoComponent', () => {
  let component: PagarServicoComponent;
  let fixture: ComponentFixture<PagarServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagarServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
