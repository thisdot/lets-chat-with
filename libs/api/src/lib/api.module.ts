import { NgModule } from '@angular/core';
import { APIService } from './api.service';
export * from './api.service';

@NgModule({
  providers: [APIService],
})
export class ApiModule {}
