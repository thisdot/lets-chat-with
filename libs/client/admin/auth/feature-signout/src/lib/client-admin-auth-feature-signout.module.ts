import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignOutRoutingModule } from './signout-routing.module';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [CommonModule, SignOutRoutingModule],
  declarations: [LogoutComponent],
})
export class ClientAdminAuthFeatureSignOutModule {}
