import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeSubmissionComponent as GradeSubmission } from './grade-submission.component';

describe('GradeSubmission', () => {
  let component: GradeSubmission;
  let fixture: ComponentFixture<GradeSubmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeSubmission],
    }).compileComponents();

    fixture = TestBed.createComponent(GradeSubmission);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
