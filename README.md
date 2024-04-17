# NgxCoreConcerns

# NgxValidationsService

This service provides a set of reusable validators for Angular forms.

| Validator Name                  | Description                                                                                        |
|--------------------------------|----------------------------------------------------------------------------------------------------|
| `passwordMatchValidator`       | Validates if the password and confirmPassword fields match.                                       |
| `strongPasswordValidator`      | Validates if the password contains at least one digit, one lowercase letter, one uppercase letter, and one special character. |
| `passwordStrengthValidator`    | Validates the strength of the password based on customizable criteria such as length, presence of uppercase and lowercase letters, digits, and special characters. |
| `minimumAgeValidator`          | Validates if the input date corresponds to an age greater than or equal to the specified minimum age. |
| `maximumAgeValidator`          | Validates if the input date corresponds to an age less than or equal to the specified maximum age. |
| `fileTypeValidator`            | Validates if the selected file type matches the specified list of allowed types.                  |
| `fileSizeValidator`            | Validates if the selected file size does not exceed the specified maximum size.                    |
| `fileValidator`                | Combines file type and file size validation into a single validator.                               |
| `imageDimensionsValidator`     | Validates if the dimensions of the selected image do not exceed the specified maximum width and height. |
| `urlValidator`                 | Validates if the input is a valid URL.                                                           |
| `nigerianPhoneNumberValidator` | Validates if the input is a valid Nigerian phone number.                                          |
| `usPhoneNumberValidator`       | Validates if the input is a valid US phone number.                                                |
| `ukPhoneNumberValidator`       | Validates if the input is a valid UK phone number.                                                |
| `ghanaianPhoneNumberValidator` | Validates if the input is a valid Ghanaian phone number.                                          |
| `kenyanPhoneNumberValidator`  | Validates if the input is a valid Kenyan phone number.                                             |
| `southAfricanPhoneNumberValidator` | Validates if the input is a valid South African phone number.                                    |
| `isbnValidator`                | Validates if the input is a valid ISBN number.                                                     |
| `dateRangeValidator`           | Validates if the date range defined by two input fields is valid (fromDate is before toDate).      |
| `noWhitespaceValidator`        | Validates if the input does not contain leading or trailing whitespace.                             |
| `emailDomainValidator`         | Validates if the email domain belongs to the specified list of allowed domains.                    |

## Usage

Import the `NgxValidationsService` in your Angular module and use the static validator functions as needed in your form controls.

```typescript
import { NgxValidationsService } from 'ngx-core-essentials';

// Example usage
const form = new FormGroup({
  password: new FormControl('', [NgxValidationsService.strongPasswordValidator]),
  confirmPassword: new FormControl('', [NgxValidationsService.passwordMatchValidator]),
});
