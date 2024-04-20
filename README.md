# NgxCoreConcerns

ngx-core-concerns is a comprehensive Angular library curated to streamline application development by providing essential services, components, pipes, and directives. Designed to simplify common tasks and address core concerns, this library empowers developers to build robust Angular applications with ease.

## Key Features

Services: A collection of utility services to handle common functionalities such as data manipulation, validation, and authentication, enhancing application efficiency and maintainability.

Components: Reusable UI components meticulously crafted to accelerate development, promote consistency, and elevate the user experience. From buttons to modals, these components are customizable and adaptable to various design systems.

Pipes: A set of handy pipes to transform and format data seamlessly within Angular templates, reducing boilerplate code and enhancing readability.

Directives: Simplify DOM manipulation and interaction with a suite of directives that enable developers to effortlessly add behavior to elements, manage user input, and enhance accessibility.

ngx-core-concerns strives to be the go-to resource for Angular developers seeking a robust foundation for their projects, enabling them to focus on building innovative features and delivering exceptional user experiences.

## NgxValidators

This service provides a set of reusable validators for Angular forms.

| Validator Name                  | Description                                                                                        |
|--------------------------------|----------------------------------------------------------------------------------------------------|
| `passwordMatch`       | Validates if the password and confirmPassword fields match.                                       |
| `strongPassword`      | Validates if the password contains at least one digit, one lowercase letter, one uppercase letter, and one special character. |
| `passwordStrength`    | Validates the strength of the password based on customizable criteria such as length, presence of uppercase and lowercase letters, digits, and special characters. |
| `minimumAge`          | Validates if the input date corresponds to an age greater than or equal to the specified minimum age. |
| `maximumAge`          | Validates if the input date corresponds to an age less than or equal to the specified maximum age. |
| `fileType`            | Validates if the selected file type matches the specified list of allowed types.                  |
| `fileSize`            | Validates if the selected file size does not exceed the specified maximum size.                    |
| `file`                | Combines file type and file size validation into a single .                               |
| `imageDimensions`     | Validates if the dimensions of the selected image do not exceed the specified maximum width and height. |
| `url`                 | Validates if the input is a valid URL.                                                           |
| `nigerianPhoneNumber` | Validates if the input is a valid Nigerian phone number.                                          |
| `usPhoneNumber`       | Validates if the input is a valid US phone number.                                                |
| `ukPhoneNumber`       | Validates if the input is a valid UK phone number.                                                |
| `ghanaianPhoneNumber` | Validates if the input is a valid Ghanaian phone number.                                          |
| `kenyanPhoneNumber`  | Validates if the input is a valid Kenyan phone number.                                             |
| `southAfricanPhoneNumber` | Validates if the input is a valid South African phone number.                                    |
| `isbn`                | Validates if the input is a valid ISBN number.                                                     |
| `dateRange`           | Validates if the date range defined by two input fields is valid (fromDate is before toDate).      |
| `noWhitespace`        | Validates if the input does not contain leading or trailing whitespace.                             |
| `emailDomain`         | Validates if the email domain belongs to the specified list of allowed domains.                    |
| `email`         | Validates email                    |

## Usage

Import the `NgxValidators` in your Angular component and use the static validator functions as needed in your form controls.

```typescript
import { NgxValidators } from 'ngx-core-concerns';

// Example usage
const form = new FormGroup({
  password: new FormControl('', [NgxValidators.strongPasswordValidator]),
  confirmPassword: new FormControl('', [NgxValidators.passwordMatchValidator]),
});
```

## Ngx Validation Message Component

The Ngx Validation Message Component is an Angular reuseable component designed to display validation messages for form controls.

## Usage

To use the Ngx Validation Message Component in your Angular application, you need to install it via npm:

Import the NgxValidationMessageModule in your Angular module:

```typescript
import { NgxValidationModule } from 'ngx-core-concerns';

@NgModule({
  imports: [
    NgxValidationModule
  ]
})
export class YourModule { }

```

Use the Component
In your component's HTML template, use the <ngx-validation-message> selector to display validation messages:

```typescript
<ngx-validation-message [control]="yourFormControl"></ngx-validation-message>
```

## Offline Service

Detect when a user is offline

## Usage

```typescript
import { Component, OnInit } from '@angular/core';
import { OfflineService } from 'ngx-core-concerns';

@Component({
  selector: 'app-my-component',
  template: `
    <div>
      Application is {{ online ? 'online' : 'offline' }}
    </div>
  `,
})
export class MyComponent implements OnInit {
  online: boolean;

  constructor(private offlineService: OfflineService) {}

  ngOnInit() {
    this.offlineService.isOnline().subscribe((isOnline) => {
      this.online = isOnline;
    });
  }
}
```
