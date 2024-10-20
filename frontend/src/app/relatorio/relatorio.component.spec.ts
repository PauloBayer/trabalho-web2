import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioComponent } from './relatorio.component';
import { categoriasSeed } from '../seeds/seed';

describe('RelatorioComponent', () => {
  let component: RelatorioComponent;
  let fixture: ComponentFixture<RelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatorioComponent, categoriasSeed],
      imports: [RelatorioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
