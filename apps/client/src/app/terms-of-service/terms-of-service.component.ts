import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutActionsService } from '../layout/layout-actions.service';

@Component({
  selector: 'cm-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.scss'],
})
export class TermsOfServiceComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(private layoutActionService: LayoutActionsService) {}

  ngOnInit(): void {
    const sub = this.layoutActionService.back$.subscribe(() => {
      window.history.back();
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
