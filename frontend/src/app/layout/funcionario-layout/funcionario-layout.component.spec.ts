import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioLayoutComponent } from './funcionario-layout.component';

describe('FuncionarioLayoutComponent', () => {
  let component: FuncionarioLayoutComponent;
  let fixture: ComponentFixture<FuncionarioLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionarioLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
