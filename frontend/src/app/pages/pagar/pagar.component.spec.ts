import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarComponent } from './pagar.component';

describe('PagarComponent', () => {
  let component: PagarComponent;
  let fixture: ComponentFixture<PagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
