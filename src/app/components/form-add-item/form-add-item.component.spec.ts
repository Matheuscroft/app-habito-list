import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddItemComponent } from './form-add-item.component';

describe('FormAddItemComponent', () => {
  let component: FormAddItemComponent;
  let fixture: ComponentFixture<FormAddItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
