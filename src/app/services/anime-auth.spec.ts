import { TestBed } from '@angular/core/testing';

import { AnimeAuth } from './anime-auth';

describe('AnimeAuth', () => {
  let service: AnimeAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimeAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
