import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'ngx-validation-message',
  templateUrl: './ngx-validation-message.component.html',
  styleUrl: './ngx-validation-message.component.css'
})
export class NgxValidationMessageComponent {
  @Input() control?: AbstractControlDirective | AbstractControl;

  public get errors() {
    const errors = [];

    if (this.control && this.control.errors) {
      for (const propertyName in this.control.errors) {
        if (Object.prototype.hasOwnProperty.call(this.control.errors, propertyName) && this.control.touched) {
          errors.push(this.errorMessages(propertyName, this.control.errors[propertyName]));
        }
      }
     
      return errors;
    }
    return null;
  }

  private errorMessages(type: string, params?: any) {
    const config = {
      required: 'This field is required',
      passwordMismatch: 'Passwords do not match. Please ensure that your passwords match and try again.',
      strongPassword: 'Please choose a stronger password and try again',
      passwordLength: `Password must be at least ${params.requiredLength} characters long`,
      passwordCase: 'Password must contain both uppercase and lowercase letters',
      passwordDigit: 'Password must contain at least one numeric digit',
      passwordSpecial: 'Password must contain at least one special character',
      minimumAge: `Minimum age is required is ${params.requiredAge}.`,
      maximumAge: `Maximum age is required is ${params.requiredAge}`,
      invalidFileType: 'Invalid file type.',
      fileSizeExceeded: `File size exceeded, maximum size allowed is ${params.requiredFileSize}`,
      imageDimensionsExceeded: `Image dimensions of max width ${params.requiredWidth} and max height ${params.requiredHeight} should not be exceeded`,
      invalidImage: 'Invalid image file.',
      invalidUrl: 'Invalid URL.',
      invalidNigerianPhoneNumber: 'Invalid Nigerian phone number.',
      invalidUSPhoneNumber: 'Invalid US phone number.',
      invalidUKPhoneNumber: 'Invalid UK phone number.',
      invalidGhanaianPhoneNumber: 'Invalid Ghanaian phone number.',
      invalidKenyanPhoneNumber: 'Invalid Kenyan phone number.',
      invalidSouthAfricanPhoneNumber: 'Invalid South African phone number.',
      invalidISBN: 'Invalid ISBN.',
      whitespace: 'Field cannot be empty.',
      invalidDomain: 'Invalid domain.',
      min: `Min value is ${params.requiredMin}`,
      max: `Enter value less than ${params.requiredMax}`
    };

    return config[type as keyof typeof config];
  }
}
