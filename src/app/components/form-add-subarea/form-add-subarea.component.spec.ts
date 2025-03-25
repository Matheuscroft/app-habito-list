import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddSubareaComponent } from './form-add-subarea.component';

describe('FormAddSubareaComponent', () => {
  let component: FormAddSubareaComponent;
  let fixture: ComponentFixture<FormAddSubareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddSubareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddSubareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
