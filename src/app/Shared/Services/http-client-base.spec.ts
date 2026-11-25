import { TestBed } from '@angular/core/testing';

import { HttpClientBase } from './http-client-base';

describe('HttpClientBase', () => {
  let service: HttpClientBase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientBase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
