import { TestBed } from '@angular/core/testing';

import { ManutencaoService } from './manutencao.service';

describe('ManutencaoService', () => {
  let service: ManutencaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManutencaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
