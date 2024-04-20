import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class NgxValidators {
  /**
   * Validates if the password meets the criteria for a strong password.
   * @returns ValidatorFn function to validate the strength of the password.
   * @usageNotes
   * This validator checks if the password contains at least one uppercase letter, one lowercase letter, one digit, and one special character.
   * @example
   * 
   * const form = this.formBuilder.group({
   *    password: ['', [Validators.required, NgxValidators.strongPassword()]]
   * });
   */
  static strongPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;

      const isValid = (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password));

      return isValid ? { 'strongPassword': true } : null;
    }
  }


  /**
   * Validates the strength of the password based on various criteria.
   * @param passwordLength The minimum length of the password.
   * @returns ValidatorFn function to validate the strength of the password.
   * @usageNotes
   * This validator checks if the password meets the specified criteria, such as minimum length, presence of uppercase and lowercase letters, numeric digits, and special characters.
   * @example
   * 
   * const form = this.formBuilder.group({
   *    password: ['', [Validators.required, NgxValidators.passwordStrength(8)]]
   * });
   */
  static passwordStrength(passwordLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;

      // Check if password is at least 8 characters long
      if (value.length < passwordLength) {
        return { 'passwordLength': { requiredLength: passwordLength } };
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

  /**
  * Validates if the password matches the confirm password.
  * @returns ValidatorFn function to validate the match between password and confirm password.
  * @usageNotes
  * This validator is commonly used in registration or password change forms to ensure that the user has entered the same password in both fields.
  * @example
  * 
  * const form = this.formBuilder.group({
  *    password: ['', Validators.required],
  *    confirmPassword: ['', [Validators.required, NgxValidators.passwordMatch]]
  * });
  */
  static passwordMatch(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.root.get('password')?.value;
      const confirmPassword = control.value;

      return password !== confirmPassword ? { 'passwordMismatch': true } : null;
    };
  };


  /**
   * Validates if the date of birth corresponds to the minimum required age.
   * @param minAge The minimum age required.
   * @returns ValidatorFn function to validate the minimum age.
   * @usageNotes
   * This validator is commonly used to ensure that users are above a certain age, such as for age-restricted content or activities.
   * @example
   * 
   * const form = this.formBuilder.group({
   *    birthday: ['', [Validators.required, NgxValidators.minimumAge(18)]]
   * });
   */
  static minimumAge(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthday = new Date(control.value);
      const ageDiffMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDiffMs);

      const age = Math.abs(ageDate.getUTCFullYear() - 1970);

      return age < minAge ? { 'minimumAge': { requiredAge: minAge, actualAge: age } } : null;
    };
  };

  /**
  * Validates if the date of birth corresponds to the maximum allowed age.
  * @param maxAge The maximum age allowed.
  * @returns ValidatorFn function to validate the maximum age.
  * @usageNotes
  * This validator can be used to ensure that users are within a certain age range, such as for age-restricted services or activities.
  * @example
  * 
  * const form = this.formBuilder.group({
  *    birthday: ['', [Validators.required, NgxValidators.maximumAgeValidator(65)]]
  * });
  */
  static maximumAge(maxAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthday = new Date(control.value);
      const ageDiffMs = Date.now() - birthday.getTime();
      const ageDate = new Date(ageDiffMs);

      const age = Math.abs(ageDate.getUTCFullYear() - 1970);

      return age > maxAge ? { 'maximumAge': { requiredAge: maxAge, actualAge: age } } : null;
    };
  };

  /**
* Validates if the file type is allowed.
* @param allowedTypes An array of allowed file types.
* @returns ValidatorFn function to validate file types.
* @usageNotes
* This validator checks if the file type matches any of the allowed file types.
* @example
* 
* const form = this.formBuilder.group({
*    file: ['', [Validators.required, NgxValidators.fileType(['image/jpeg', 'image/png'])]]
* });
*/

  static fileType = (allowedTypes: string[]): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      const fileType = file ? file.type : null;

      return allowedTypes.includes(fileType) ? null : { 'invalidFileType': true };
    };
  };


  /**
  * Validates the file size of file.
  * @param maxSize allowed file size.
  * @returns ValidatorFn function to validate the file type.
  * @usageNotes
  * This validator is useful for restricting the file sizes that can be uploaded through a file input control.
  * @example
  * 
  * const form = this.formBuilder.group({
  *    file: ['', [Validators.required, NgxValidators.fileSize(2048)]]
  * });
  */

  static fileSize = (maxSize: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      const fileSize = file ? file.size : 0;

      return fileSize <= maxSize ? null : { 'fileSizeExceeded': {requiredFileSize: maxSize} };
    };
  };

  /**
 * Validates the file size and type against provided constraints.
 * @param allowedTypes Array of allowed file types.
 * @param maxSize Maximum allowed size in kilobytes.
 * @returns ValidatorFn function to validate the file size and type.
 * @usageNotes
 * This validator is commonly used for validating file uploads, ensuring that files are of the correct type and size.
 * @example
 * 
 * const form = this.formBuilder.group({
 *    file: ['', [Validators.required, NgxValidators.fileValidator(['image/jpeg', 'image/png'], 2048)]]
 * });
 */

  static fileValidator(allowedTypes: string[], maxSize: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      if (file) {
        const fileSizeKB = file.size / 1024; // Convert bytes to KB
        if (fileSizeKB > maxSize) {
          return { 'fileSizeExceeded': {requiredFileSize: maxSize} };
        }
        const fileType = file.type.split('/')[1]; // Get the file extension
        if (!allowedTypes.includes(fileType)) {
          return { 'invalidFileType': true };
        }
      }
      return null;
    };
  }

  /**
 * Validates the dimensions of an image file.
 * @param maxWidth Maximum allowed width of the image.
 * @param maxHeight Maximum allowed height of the image.
 * @returns ValidatorFn function to validate the image dimensions.
 * @usageNotes
 * This validator is used to ensure that uploaded images meet specified dimension constraints.
 * @example
 * 
 * const form = this.formBuilder.group({
 *    image: ['', [Validators.required, NgxValidators.imageDimensions(800, 600)]]
 * });
 */

  static imageDimensions(maxWidth: number, maxHeight: number): ValidatorFn {
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
        return dimensions.width <= maxWidth && dimensions.height <= maxHeight ? null : { 'imageDimensionsExceeded': {
          requiredWidth: maxWidth,
          requiredHeight: maxHeight
        } };
      }).catch(() => {
        return { 'invalidImage': true };
      });
    };
  };

  /**
   * Validates if the input value is a valid URL.
   * @returns ValidatorFn function to validate URLs.
   * @usageNotes
   * This validator checks if the input value conforms to the URL format.
   * @example
   * 
   * const form = this.formBuilder.group({
   *    website: ['', [Validators.required, NgxValidators.urlValidator()]]
   * });
   */

  static urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
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

  /**
  * Validates if the input value is a valid Nigerian phone number.
  * @returns ValidatorFn function to validate Nigerian phone numbers.
  * @usageNotes
  * This validator checks if the input value conforms to the format of Nigerian phone numbers.
  * @example
  * 
  * const form = this.formBuilder.group({
  *    phoneNumber: ['', [Validators.required, NgxValidators.nigerianPhoneNumber()]]
  * });
  */

  static nigerianPhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumber = control.value;
      const isValid = /^(\+?234|0)\d{10}$/.test(phoneNumber);
      return isValid ? null : { 'invalidNigerianPhoneNumber': true };
    };
  }

  /**
  * Validates if the input value is a valid US phone number.
  * @returns ValidatorFn function to validate US phone numbers.
  * @usageNotes
  * This validator checks if the input value conforms to the format of US phone numbers.
  * @example
  * 
  * const form = this.formBuilder.group({
  *    phoneNumber: ['', [Validators.required, NgxValidators.usPhoneNumber()]]
  * });
  */

  static usPhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumber = control.value;
      const isValid = /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/.test(phoneNumber);
      return isValid ? null : { 'invalidUSPhoneNumber': true };
    };
  }

  /**
  * Validates if the input value is a valid UK phone number.
  * @returns ValidatorFn function to validate UK phone numbers.
  * @usageNotes
  * This validator checks if the input value conforms to the format of UK phone numbers.
  * @example
  * 
  * const form = this.formBuilder.group({
  *    phoneNumber: ['', [Validators.required, NgxValidators.ukPhoneNumber()]]
  * });
  */

  static ukPhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumber = control.value;
      const isValid = /^(\+?44|0)\d{10}$/.test(phoneNumber);
      return isValid ? null : { 'invalidUKPhoneNumber': true };
    };
  }

  /**
  * Validates if the input value is a valid Ghanaian phone number.
  * @returns ValidatorFn function to validate Ghanaian phone numbers.
  * @usageNotes
  * This validator checks if the input value conforms to the format of Ghanaian phone numbers.
  * @example
  * 
  * const form = this.formBuilder.group({
  *    phoneNumber: ['', [Validators.required, NgxValidators.ghanaianPhoneNumber()]]
  * });
  */

  static ghanaianPhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumber = control.value;
      const isValid = /^(\+?233|0)\d{9}$/.test(phoneNumber);
      return isValid ? null : { 'invalidGhanaianPhoneNumber': true };
    };
  }

  /**
  * Validates if the input value is a valid Kenyan phone number.
  * @returns ValidatorFn function to validate Kenyan phone numbers.
  * @usageNotes
  * This validator checks if the input value conforms to the format of Kenyan phone numbers.
  * @example
  * 
  * const form = this.formBuilder.group({
  *    phoneNumber: ['', [Validators.required, NgxValidators.kenyanPhoneNumber()]]
  * });
  */

  static kenyanPhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumber = control.value;
      const isValid = /^(\+?254|0)\d{9}$/.test(phoneNumber);
      return isValid ? null : { 'invalidKenyanPhoneNumber': true };
    };
  }

  /**
 * Validates if the input value is a valid South African phone number.
 * @returns ValidatorFn function to validate South African phone numbers.
 * @usageNotes
 * This validator checks if the input value conforms to the format of South African phone numbers.
 * @example
 * 
 * const form = this.formBuilder.group({
 *    phoneNumber: ['', [Validators.required, NgxValidators.southAfricanPhoneNumber()]]
 * });
 */

  static southAfricanPhoneNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumber = control.value;
      const isValid = /^(\+?27|0)\d{9}$/.test(phoneNumber);
      return isValid ? null : { 'invalidSouthAfricanPhoneNumber': true };
    };
  }

  /**
  * Validates if the input value is a valid International Standard Book Number (ISBN).
  * @returns ValidatorFn function to validate ISBNs.
  * @usageNotes
  * This validator checks if the input value conforms to the format of ISBNs.
  * @example
  * 
  * const form = this.formBuilder.group({
  *    isbn: ['', [Validators.required, NgxValidators.isbn()]]
  * });
  */

  static isbn(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isbn = control.value;
      const pattern = new RegExp('^(?=(?:\\D*\\d){10}(?:(?:\\D*\\d){3})?$)[\\d-]+$');
      const isValid = pattern.test(isbn);
      return isValid ? null : { 'invalidISBN': true };
    };
  }

  /**
  * Validates if the date range is valid.
  * @param fromDateControlName The name of the form control representing the start date.
  * @param toDateControlName The name of the form control representing the end date.
  * @returns ValidatorFn function to validate date ranges.
  * @usageNotes
  * This validator checks if the start date is before or equal to the end date.
  * @example
  * 
  * const form = this.formBuilder.group({
  *    startDate: ['', Validators.required],
  *    endDate: ['', Validators.required],
  * }, { validators: NgxValidators.dateRange() });
  */

  static dateRange() {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate = control.root.get('startDate')?.value;
      const endDate = control?.value;

      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        return { 'dateRangeInvalid': true };
      } else {
        return null;
      }
    };
  }

  /**
   * Validates if the input value contains no whitespace characters.
   * @returns ValidatorFn function to validate absence of whitespace.
   * @usageNotes
   * This validator checks if the input value contains any whitespace characters.
   * @example
   * 
   * const form = this.formBuilder.group({
   *    username: ['', [Validators.required, NgxValidators.noWhitespace()]]
   * });
   */

  static noWhitespace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && /^\s|\s$/.test(control.value)) {
        return { 'whitespace': true };
      } else {
        return null;
      }
    };
  }

  /**
  * Validates if the email domain is allowed.
  * @param allowedDomains An array of allowed email domains.
  * @returns ValidatorFn function to validate email domains.
  * @usageNotes
  * This validator checks if the domain part of the email address is among the allowed domains.
  * @example
  * 
  * const form = this.formBuilder.group({
  *    email: ['', [Validators.required, NgxValidators.emailDomain(['example.com', 'gmail.com'])]]
  * });
  */

  static emailDomain(allowedDomains: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
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


   /**
  * Validates if the email domain is allowed.
  * @returns ValidatorFn function to validate email.
  * @usageNotes
  * This validator checks if the entered email address is valid.
  * @example
  * 
  * const form = this.formBuilder.group({
  *    email: ['', [Validators.required, NgxValidators.email]]
  * });
  */
  static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const isValid = emailPattern.test(control.value);

      return isValid ? null : { 'invalidEmail': true };
    };
  }
}