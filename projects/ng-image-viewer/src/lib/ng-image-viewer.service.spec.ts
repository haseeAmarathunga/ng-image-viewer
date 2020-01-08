import { TestBed } from '@angular/core/testing';

import { NgImageViewerService } from './ng-image-viewer.service';

describe('NgImageViewerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgImageViewerService = TestBed.get(NgImageViewerService);
    expect(service).toBeTruthy();
  });
});
