import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ClientAdminCoreShellModule } from '@conf-match/client/admin/core/shell';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [ClientAdminCoreShellModule, RouterModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
