import { TestBed } from '@angular/core/testing';

import { AssignmentEleveService } from './assignment-eleve.service';

describe('AssignmentEleveService', () => {
  let service: AssignmentEleveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentEleveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
