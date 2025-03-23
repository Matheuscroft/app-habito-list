import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddAreaComponent } from './form-add-area.component';

describe('FormAddAreaComponent', () => {
  let component: FormAddAreaComponent;
  let fixture: ComponentFixture<FormAddAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
