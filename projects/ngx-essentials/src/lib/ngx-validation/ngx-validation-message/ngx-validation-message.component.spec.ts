import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxValidationMessageComponent } from './ngx-validation-message.component';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

describe('NgxValidationMessageComponent', () => {
  let component: NgxValidationMessageComponent;
  let fixture: ComponentFixture<NgxValidationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxValidationMessageComponent ],
      imports: [FormsModule, ReactiveFormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return null if control is undefined', () => {
    expect(component.errors).toBeNull();
  });

  it('should return null if control errors is undefined', () => {
    component.control = new FormControl('', null);
    expect(component.errors).toBeNull();
  });

  it('should return error message for required', () => {
    const control = new FormControl('', Validators.required);
    component.control = control;
    control.markAsTouched();
    fixture.detectChanges();
    expect(component.errors).toContain('This field is required');
  });
});
