import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeComponent } from './theme/theme.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ThemeComponent],
  exports: [ThemeComponent],
})
export class SharedStorybookHelpersModule {}
