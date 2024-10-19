import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncinarioMainPageComponent } from './funcinario-main-page.component';

describe('FuncinarioMainPageComponent', () => {
  let component: FuncinarioMainPageComponent;
  let fixture: ComponentFixture<FuncinarioMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncinarioMainPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncinarioMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
