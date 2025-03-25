import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubareasListComponent } from './subareas-list.component';

describe('SubareasListComponent', () => {
  let component: SubareasListComponent;
  let fixture: ComponentFixture<SubareasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubareasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubareasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
