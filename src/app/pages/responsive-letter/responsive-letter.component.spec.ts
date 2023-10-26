import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiveLetterComponent } from './responsive-letter.component';

describe('ResponsiveLetterComponent', () => {
  let component: ResponsiveLetterComponent;
  let fixture: ComponentFixture<ResponsiveLetterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ResponsiveLetterComponent]
    });
    fixture = TestBed.createComponent(ResponsiveLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
