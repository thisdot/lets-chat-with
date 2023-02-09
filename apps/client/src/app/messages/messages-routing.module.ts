import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessageThreadListComponent } from './message-thread-list/message-thread-list.component';
import { MessageThreadComponent } from './message-thread/message-thread.component';

const routes = [
  { path: '', component: MessageThreadListComponent },
  {
    path: ':chatThreadId',
    component: MessageThreadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageRoutingModule {}
