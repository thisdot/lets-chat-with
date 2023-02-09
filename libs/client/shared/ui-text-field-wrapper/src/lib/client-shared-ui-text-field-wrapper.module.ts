import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldWrapperComponent } from './text-field-wrapper/text-field-wrapper.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TextFieldWrapperComponent],
  exports: [TextFieldWrapperComponent],
})
export class ClientSharedUiTextFieldWrapperModule {}
