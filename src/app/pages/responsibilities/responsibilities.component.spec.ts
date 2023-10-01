import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibilitiesComponent } from './responsibilities.component';

describe('ResponsibilitiesComponent', () => {
  let component: ResponsibilitiesComponent;
  let fixture: ComponentFixture<ResponsibilitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResponsibilitiesComponent]
    });
    fixture = TestBed.createComponent(ResponsibilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
