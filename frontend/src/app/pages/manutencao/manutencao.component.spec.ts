import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManutencaoComponent } from './manutencao.component';

describe('ManutencaoComponent', () => {
  let component: ManutencaoComponent;
  let fixture: ComponentFixture<ManutencaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManutencaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManutencaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
