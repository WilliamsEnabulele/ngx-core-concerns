import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { NgxValidators } from './ngx-validators';
import { NgxValidationMessageComponent } from './ngx-validation-message/ngx-validation-message.component';

describe('NgxValidators', () => {
  let component: NgxValidationMessageComponent;
  let fixture: ComponentFixture<NgxValidationMessageComponent>;

  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxValidationMessageComponent ],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    });

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(NgxValidationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should validate password strength - valid password', () => {
    const validator: ValidatorFn = NgxValidators.passwordStrength(8);
    const control = new FormControl('StrongPassword1!');
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate password strength - too short password', () => {
    const validator: ValidatorFn = NgxValidators.passwordStrength(8);
    const control = new FormControl('Short1!');
    const result = validator(control);
    const check = new FormControl('!', NgxValidators.passwordStrength(8));
    component.control = control;
    control.markAsTouched();
    fixture.detectChanges();
    console.log(component.errors, "HERE")
    expect(result).toEqual({ 'passwordLength': { requiredLength: 8 } });
  });

  it('should validate password strength - missing uppercase letter', () => {
    const validator: ValidatorFn = NgxValidators.passwordStrength(8);
    const control = new FormControl('weakpassword1!');
    const result = validator(control);
    expect(result).toEqual({ 'passwordCase': true });
  });

  it('should validate password strength - missing lowercase letter', () => {
    const validator: ValidatorFn = NgxValidators.passwordStrength(8);
    const control = new FormControl('WEAKPASSWORD1!');
    const result = validator(control);
    expect(result).toEqual({ 'passwordCase': true });
  });

  it('should validate password strength - missing digit', () => {
    const validator: ValidatorFn = NgxValidators.passwordStrength(8);
    const control = new FormControl('WeakPassword!');
    const result = validator(control);
    expect(result).toEqual({ 'passwordDigit': true });
  });

  it('should validate password strength - missing special character', () => {
    const validator: ValidatorFn = NgxValidators.passwordStrength(8);
    const control = new FormControl('WeakPassword1');
    const result = validator(control);
    expect(result).toEqual({ 'passwordSpecial': true });
  })

  it('should return null when password is strong', () => {
    const form: FormGroup = formBuilder.group({
      password: 'strongPassword123$'
    });

    const control: AbstractControl | any = form.get('password');

    const result = NgxValidators.strongPassword()(control);

    expect(result).toBeNull();
  });

  it('should return validation error when password is not strong', () => {
    const form: FormGroup = formBuilder.group({
      password: 'weakpassword'
    });

    const control: AbstractControl | any = form.get('password');
    const result = NgxValidators.strongPassword()(control);

    expect(result).toEqual({ 'strongPassword': true });
  });

  it('should return null when passwords match', () => {
    const form: FormGroup = formBuilder.group({
      password: 'password123',
      confirmPassword: ['password123', NgxValidators.passwordMatch ]
    });

    const control: AbstractControl | any = form.get('confirmPassword');
    const result = NgxValidators.passwordMatch()(control);
    expect(result).toBeNull();
  });

  it('should return validation error when passwords do not match', () => {
    const form: FormGroup = formBuilder.group({
      password: 'password123',
      confirmPassword: ['password456', NgxValidators.passwordMatch]
    });

    const control: AbstractControl | any | null = form.get('confirmPassword');
    const result = NgxValidators.passwordMatch()(control);

    expect(result).toEqual({ 'passwordMismatch': true });
  });


  it('should return null when age is greater than or equal to the minimum age', () => {
    const control = new FormControl('2000-01-01');
    const validator = NgxValidators.minimumAge(18);
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return error object when age is less than the minimum age', () => {
    const minAge = 18;
    const control = new FormControl('2010-01-01');
    const validator = NgxValidators.minimumAge(minAge);
    const result = validator(control);
    expect(result).toEqual({ minimumAge: { requiredAge: minAge, actualAge: 14 } });
  });

  it('should return null when age is equal to the minimum age', () => {
    const minAge = 18;
    const control = new FormControl(new Date(new Date().setFullYear(new Date().getFullYear() - minAge)));
    const validator = NgxValidators.minimumAge(minAge);
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate maximum age', () => {
    const control = new FormControl('2000-01-01');
    const validator = NgxValidators.maximumAge(30);
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate file type', () => {
    const control = new FormControl({ type: 'image/png' });
    const validator = NgxValidators.fileType(['image/jpeg', 'image/png']);
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate file size', () => {
    const blob = new Blob([""], { type: 'text/plain' });
    Object.defineProperty(blob, 'size', { value: 2048 });

    const control = new FormControl(blob);
    const validator = NgxValidators.fileSize(2048);
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate image dimensions', async () => {
    const mockImage = new Image();
    spyOnProperty(mockImage, 'src', 'get').and.returnValue('');
    spyOn(globalThis, 'Image').and.returnValue(mockImage);

    const control = new FormControl(new File([""], "image.png", { type: "image/png" }));
    const validator = NgxValidators.imageDimensions(100, 100);

    setTimeout(() => {
      const event: any = {
        target: mockImage,
        currentTarget: mockImage,
        width: 150,
        height: 150
      };

      mockImage.onload?.(event);
    }, 100);

    const result = await validator(control);
    expect(result).toEqual({ invalidImage: true });
  });

  it('should validate URL', () => {
    const control = new FormControl('https://example.com');
    const validator = NgxValidators.urlValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate Nigerian phone number', () => {
    const control = new FormControl('08012345678');
    const validator = NgxValidators.nigerianPhoneNumber();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate US phone number', () => {
    const control = new FormControl('123-456-7890');
    const validator = NgxValidators.usPhoneNumber();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate UK phone number', () => {
    const control = new FormControl('07123456789');
    const validator = NgxValidators.ukPhoneNumber();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate Ghanaian phone number', () => {
    const control = new FormControl('0234567890');
    const validator = NgxValidators.ghanaianPhoneNumber();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate Kenyan phone number', () => {
    const control = new FormControl('0712345678');
    const validator = NgxValidators.kenyanPhoneNumber();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate South African phone number', () => {
    const control = new FormControl('0712345678');
    const validator = NgxValidators.southAfricanPhoneNumber();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate ISBN', () => {
    const control = new FormControl('978-3-16-148410-0');
    const validator = NgxValidators.isbn();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate whitespace', () => {
    const control = new FormControl(' ');
    const validator = NgxValidators.noWhitespace();
    const result = validator(control);
    expect(result).toEqual({ 'whitespace': true });
  });

  it('should validate date range - valid range', () => {
    const validator = NgxValidators.dateRange();
    const formGroup = new FormGroup({
      startDate: new FormControl('2022-01-01'),
      endDate: new FormControl('2022-01-10')
    });

    const result = validator(formGroup);
    expect(result).toBeNull();
  });

  it('should validate date range - invalid range (start date after end date)', () => {
    const formGroup = new FormGroup({
      startDate: new FormControl('2022-01-10'),
      endDate: new FormControl('2022-01-01')
    });

    const control: AbstractControl | any = formGroup.get('endDate');
    const result = NgxValidators.dateRange()(control);
    expect(result).toEqual({ 'dateRangeInvalid': true });
  });

  it('should validate date range - invalid range (end date not provided)', () => {
    const formGroup = new FormGroup({
      startDate: new FormControl('2022-01-01'),
      endDate: new FormControl('')
    });

    const control: AbstractControl | any = formGroup.get('endDate');
    const result = NgxValidators.dateRange()(control);
    expect(result).toBeNull();
  });

  it('should validate date range - invalid range (start date not provided)', () => {
    const formGroup = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('2022-01-10')
    });

    const control: AbstractControl | any = formGroup.get('endDate');
    const result = NgxValidators.dateRange()(control);
    expect(result).toBeNull();
  });

  it('should validate domain', () => {
    const control = new FormControl('example@example.com');
    const validator = NgxValidators.emailDomain(['example.com']);
    const result = validator(control);
    expect(result).toBeNull();
  });
});
