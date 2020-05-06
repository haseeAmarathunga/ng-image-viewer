import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadFacilityComponent } from './lead-facility.component';

describe('LeadFacilityComponent', () => {
  let component: LeadFacilityComponent;
  let fixture: ComponentFixture<LeadFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
