# NgxCoreConcerns
ngx-core-concerns is a comprehensive Angular library curated to streamline application development by providing essential services, components, pipes, and directives. Designed to simplify common tasks and address core concerns, this library empowers developers to build robust Angular applications with ease.

## Key Features:
Services: A collection of utility services to handle common functionalities such as data manipulation, validation, and authentication, enhancing application efficiency and maintainability.

Components: Reusable UI components meticulously crafted to accelerate development, promote consistency, and elevate the user experience. From buttons to modals, these components are customizable and adaptable to various design systems.

Pipes: A set of handy pipes to transform and format data seamlessly within Angular templates, reducing boilerplate code and enhancing readability.

Directives: Simplify DOM manipulation and interaction with a suite of directives that enable developers to effortlessly add behavior to elements, manage user input, and enhance accessibility.

ngx-core-concerns strives to be the go-to resource for Angular developers seeking a robust foundation for their projects, enabling them to focus on building innovative features and delivering exceptional user experiences.

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
import { NgxValidationsService } from 'ngx-core-concerns';

// Example usage
const form = new FormGroup({
  password: new FormControl('', [NgxValidationsService.strongPasswordValidator]),
  confirmPassword: new FormControl('', [NgxValidationsService.passwordMatchValidator]),
});
```

# Ngx Validation Message Component

The Ngx Validation Message Component is an Angular reuseable component designed to display validation messages for form controls.

## Usage

To use the Ngx Validation Message Component in your Angular application, you need to install it via npm:

Import the NgxValidationMessageModule in your Angular module:

```typescript
import { NgxValidationMessageModule } from 'ngx-core-concerns';

@NgModule({
  imports: [
    NgxValidationMessageModule
  ]
})
export class YourModule { }

```

Use the Component
In your component's HTML template, use the <ngx-validation-message> selector to display validation messages:

```typescript
<ngx-validation-message [control]="yourFormControl"></ngx-validation-message>
```
