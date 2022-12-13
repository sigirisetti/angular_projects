import { TestBed } from '@angular/core/testing';

import { ClickhouseEnvService } from './clickhouse-env.service';

describe('ClickhouseEnvService', () => {
  let service: ClickhouseEnvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickhouseEnvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
