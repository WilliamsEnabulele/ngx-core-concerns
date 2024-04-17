import { TestBed } from '@angular/core/testing';

import { NgxValidationsService } from './ngx-validations.service';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';

describe('NgxValidationsService', () => {
  let service: NgxValidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxValidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should validate password match', () => {
    const form = new FormGroup({
      password: new FormControl('password'),
      confirmPassword: new FormControl('password')
    });
    const result = NgxValidationsService.passwordMatchValidator(form);
    expect(result).toBeNull();
  });

  it('should validate password match when given different passwords', () => {
    const form = new FormGroup({
      password: new FormControl('password'),
      confirmPassword: new FormControl('password2')
    });
    const result = NgxValidationsService.passwordMatchValidator(form);
    expect(result).toEqual({ 'passwordMismatch': true });
  });

  it('should validate password strength - valid password', () => {
    const validator: ValidatorFn = NgxValidationsService.passwordStrengthValidator(8);
    const control = new FormControl('StrongPassword1!');
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate password strength - too short password', () => {
    const validator: ValidatorFn = NgxValidationsService.passwordStrengthValidator(8);
    const control = new FormControl('Short1!');
    const result = validator(control);
    expect(result).toEqual({ 'passwordLength': true });
  });

  it('should validate password strength - missing uppercase letter', () => {
    const validator: ValidatorFn = NgxValidationsService.passwordStrengthValidator(8);
    const control = new FormControl('weakpassword1!');
    const result = validator(control);
    expect(result).toEqual({ 'passwordCase': true });
  });

  it('should validate password strength - missing lowercase letter', () => {
    const validator: ValidatorFn = NgxValidationsService.passwordStrengthValidator(8);
    const control = new FormControl('WEAKPASSWORD1!');
    const result = validator(control);
    expect(result).toEqual({ 'passwordCase': true });
  });

  it('should validate password strength - missing digit', () => {
    const validator: ValidatorFn = NgxValidationsService.passwordStrengthValidator(8);
    const control = new FormControl('WeakPassword!');
    const result = validator(control);
    expect(result).toEqual({ 'passwordDigit': true });
  });

  it('should validate password strength - missing special character', () => {
    const validator: ValidatorFn = NgxValidationsService.passwordStrengthValidator(8);
    const control = new FormControl('WeakPassword1');
    const result = validator(control);
    expect(result).toEqual({ 'passwordSpecial': true });
  });

  it('should validate strong password', () => {
    const control = new FormControl('StrongPassword1!');
    const result = NgxValidationsService.strongPasswordValidator(control);
    expect(result).toBeNull();
  });

  it('should validate minimum age', () => {
    const control = new FormControl('2000-01-01');
    const validator = NgxValidationsService.minimumAgeValidator(18);
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate maximum age', () => {
    const control = new FormControl('2000-01-01');
    const validator = NgxValidationsService.maximumAgeValidator(30);
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate file type', () => {
    const control = new FormControl({ type: 'image/png' });
    const validator = NgxValidationsService.fileTypeValidator(['image/jpeg', 'image/png']);
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate file size', () => {
    const blob = new Blob([""], { type: 'text/plain' });
    Object.defineProperty(blob, 'size', { value: 2048 });

    const control = new FormControl(blob);
    const validator = NgxValidationsService.fileSizeValidator(2048);
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate image dimensions', async () => {
    const mockImage = new Image();
    spyOnProperty(mockImage, 'src', 'get').and.returnValue('');
    spyOn(globalThis, 'Image').and.returnValue(mockImage);

    const control = new FormControl(new File([""], "image.png", { type: "image/png" }));
    const validator = NgxValidationsService.imageDimensionsValidator(100, 100);

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
    const validator = NgxValidationsService.urlValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate Nigerian phone number', () => {
    const control = new FormControl('08012345678');
    const validator = NgxValidationsService.nigerianPhoneNumberValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate US phone number', () => {
    const control = new FormControl('123-456-7890');
    const validator = NgxValidationsService.usPhoneNumberValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate UK phone number', () => {
    const control = new FormControl('07123456789');
    const validator = NgxValidationsService.ukPhoneNumberValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate Ghanaian phone number', () => {
    const control = new FormControl('0234567890');
    const validator = NgxValidationsService.ghanaianPhoneNumberValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate Kenyan phone number', () => {
    const control = new FormControl('0712345678');
    const validator = NgxValidationsService.kenyanPhoneNumberValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate South African phone number', () => {
    const control = new FormControl('0712345678');
    const validator = NgxValidationsService.southAfricanPhoneNumberValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate ISBN', () => {
    const control = new FormControl('978-3-16-148410-0');
    const validator = NgxValidationsService.isbnValidator();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should validate whitespace', () => {
    const control = new FormControl(' ');
    const validator = NgxValidationsService.noWhitespaceValidator();
    const result = validator(control);
    expect(result).toEqual({ 'whitespace': true });
  });

  it('should validate date range - valid range', () => {
    const validator = NgxValidationsService.dateRangeValidator('startDate', 'endDate');
    const formGroup = new FormGroup({
      startDate: new FormControl('2022-01-01'),
      endDate: new FormControl('2022-01-10')
    });
    const result = validator(formGroup);
    expect(result).toBeNull();
  });

  it('should validate date range - invalid range (start date after end date)', () => {
    const validator = NgxValidationsService.dateRangeValidator('startDate', 'endDate');
    const formGroup = new FormGroup({
      startDate: new FormControl('2022-01-10'),
      endDate: new FormControl('2022-01-01')
    });
    const result = validator(formGroup);
    expect(result).toEqual({ 'dateRangeInvalid': true });
  });

  it('should validate date range - invalid range (end date not provided)', () => {
    const validator = NgxValidationsService.dateRangeValidator('startDate', 'endDate');
    const formGroup = new FormGroup({
      startDate: new FormControl('2022-01-01'),
      endDate: new FormControl('')
    });
    const result = validator(formGroup);
    expect(result).toBeNull();
  });

  it('should validate date range - invalid range (start date not provided)', () => {
    const validator = NgxValidationsService.dateRangeValidator('startDate', 'endDate');
    const formGroup = new FormGroup({
      startDate: new FormControl(''),
      endDate: new FormControl('2022-01-10')
    });
    const result = validator(formGroup);
    expect(result).toBeNull();
  });

  it('should validate domain', () => {
    const control = new FormControl('example@example.com');
    const validator = NgxValidationsService.emailDomainValidator(['example.com']);
    const result = validator(control);
    expect(result).toBeNull();
  });
});
