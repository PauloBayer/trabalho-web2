import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarAltFuncComponent } from './criar-alt-func.component';

describe('CriarAltFuncComponent', () => {
  let component: CriarAltFuncComponent;
  let fixture: ComponentFixture<CriarAltFuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarAltFuncComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarAltFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
