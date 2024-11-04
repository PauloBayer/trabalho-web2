import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFuncComponent } from './delete-func.component';

describe('DeleteFuncComponent', () => {
  let component: DeleteFuncComponent;
  let fixture: ComponentFixture<DeleteFuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteFuncComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
