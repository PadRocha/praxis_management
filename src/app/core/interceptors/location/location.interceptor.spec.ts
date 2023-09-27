import { TestBed } from '@angular/core/testing';

import { LocationInterceptor } from './location.interceptor';

describe('LocationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LocationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: LocationInterceptor = TestBed.inject(LocationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
