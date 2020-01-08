import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgImageViewerComponent } from './ng-image-viewer.component';

describe('NgImageViewerComponent', () => {
  let component: NgImageViewerComponent;
  let fixture: ComponentFixture<NgImageViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgImageViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
