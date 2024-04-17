import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class NgxValidationsService {

  constructor() { }

  static passwordMatchValidator = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordMismatch': true } : null;
  };

  static strongPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
      return { 'strongPassword': true };
    }

    return null;
  };

  static passwordStrengthValidator = (passwordLength: number): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value: string = control.value;
      
      // Check if password is at least 8 characters long
      if (value.length < passwordLength) {
        return { 'passwordLength': true };
      }
      
      // Check if password contains uppercase and lowercase letters
      if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
        return { 'passwordCase': true };
      }
      
      // Check if password contains at least one numeric digit
      if (!/\d/.test(value)) {
        return { 'passwordDigit': true };
      }
      
      // Check if password contains at least one special character
      if (!/[!@#$%^&*()_+\-=[\]{}|;':",.<>/?]/.test(value)) {
        return { 'passwordSpecial': true };
      }
      
      // All criteria are met, password is strong
      return null;
    };
  }

  static minimumAgeValidator = (minAge: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthday = new Date(control.value);
      const ageDiffMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDiffMs);

      const age = Math.abs(ageDate.getUTCFullYear() - 1970);

      return age < minAge ? { 'minimumAge': { requiredAge: minAge, actualAge: age } } : null;
    };
  };

  static maximumAgeValidator = (maxAge: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthday = new Date(control.value);
      const ageDiffMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDiffMs);

      const age = Math.abs(ageDate.getUTCFullYear() - 1970);

      return age > maxAge ? { 'maximumAge': { requiredAge: maxAge, actualAge: age } } : null;
    };
  };

  static fileTypeValidator = (allowedTypes: string[]): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      const fileType = file ? file.type : null;

      return allowedTypes.includes(fileType) ? null : { 'invalidFileType': true };
    };
  };

  static fileSizeValidator = (maxSize: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      const fileSize = file ? file.size : 0;

      return fileSize <= maxSize ? null : { 'fileSizeExceeded': true };
    };
  };

  static fileValidator(allowedTypes: string[], maxSizeKB: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const file = control.value;
      if (file) {
        const fileSizeKB = file.size / 1024; // Convert bytes to KB
        if (fileSizeKB > maxSizeKB) {
          return { 'fileSizeExceeded': true };
        }
        const fileType = file.type.split('/')[1]; // Get the file extension
        if (!allowedTypes.includes(fileType)) {
          return { 'invalidFileType': true };
        }
      }
      return null;
    };
  }

  static imageDimensionsValidator = (maxWidth: number, maxHeight: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      const image = new Image();
      image.src = URL.createObjectURL(file);
      const promise = new Promise((resolve, reject) => {
        image.onload = () => {
          const width = image.width;
          const height = image.height;
          URL.revokeObjectURL(image.src);
          resolve({ width, height });
        };
        image.onerror = reject;
      });

      return promise.then((dimensions: any) => {
        return dimensions.width <= maxWidth && dimensions.height <= maxHeight ? null : { 'imageDimensionsExceeded': true };
      }).catch(() => {
        return { 'invalidImage': true };
      });
    };
  };

  static urlValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const url = control.value;
      const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
      const isValid = pattern.test(url);
      return isValid ? null : { 'invalidUrl': true };
    };
  }

  static nigerianPhoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumber = control.value;
      const isValid = /^(\+?234|0)\d{10}$/.test(phoneNumber);
      return isValid ? null : { 'invalidNigerianPhoneNumber': true };
    };
  }

  static usPhoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumber = control.value;
      const isValid = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/.test(phoneNumber);
      return isValid ? null : { 'invalidUSPhoneNumber': true };
    };
  }

  static ukPhoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumber = control.value;
      const isValid = /^(\+?44|0)\d{10}$/.test(phoneNumber);
      return isValid ? null : { 'invalidUKPhoneNumber': true };
    };
  }

  static ghanaianPhoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumber = control.value;
      const isValid = /^(\+?233|0)\d{9}$/.test(phoneNumber);
      return isValid ? null : { 'invalidGhanaianPhoneNumber': true };
    };
  }

  static kenyanPhoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumber = control.value;
      const isValid = /^(\+?254|0)\d{9}$/.test(phoneNumber);
      return isValid ? null : { 'invalidKenyanPhoneNumber': true };
    };
  }

  static southAfricanPhoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneNumber = control.value;
      const isValid = /^(\+?27|0)\d{9}$/.test(phoneNumber);
      return isValid ? null : { 'invalidSouthAfricanPhoneNumber': true };
    };
  }

  static isbnValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isbn = control.value;
      const pattern = new RegExp('^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$');
      const isValid = pattern.test(isbn);
      return isValid ? null : { 'invalidISBN': true };
    };
  }

  static dateRangeValidator(fromDateControlName: string, toDateControlName: string) {
    return (control: FormGroup): ValidationErrors | null => {
      const fromDate = control.get(fromDateControlName)?.value;
      const toDate = control.get(toDateControlName)?.value;

      if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
        return { 'dateRangeInvalid': true };
      } else {
        return null;
      }
    };
  }

  static noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && /^\s|\s$/.test(control.value)) {
        return { 'whitespace': true };
      } else {
        return null;
      }
    };
  }

  static emailDomainValidator(allowedDomains: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const email: string = control.value;
      if (!email) {
        return null;
      }

      const emailParts: string[] = email.split('@');
      if (emailParts.length > 1) {
        const domain: string = emailParts[1];
        if (!allowedDomains.includes(domain)) {
          return { 'invalidDomain': true };
        }
      }

      return null;
    };
  }
}
