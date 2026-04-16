import { TestBed } from '@angular/core/testing';

import { AnimeApi } from './anime-api';

describe('AnimeApi', () => {
  let service: AnimeApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimeApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
