import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxValidationMessageComponent } from './ngx-validation-message/ngx-validation-message.component';



@NgModule({
  declarations: [NgxValidationMessageComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxValidationMessageComponent]
})
export class NgxValidationModule { }
