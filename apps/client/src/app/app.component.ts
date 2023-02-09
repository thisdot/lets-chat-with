import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { selectConference } from '@conf-match/core';
import { Store } from '@ngrx/store';
import { environment } from '../environments/environment';
import { GoogleAnalyticsService } from './analytics/google-analytics.service';

@Component({
  selector: 'cm-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly googleAnalyticsService: GoogleAnalyticsService,
    private readonly store: Store<any>,
    private titleService: Title
  ) {
    this.store.select(selectConference).subscribe((c) => {
      const title = c ? `${c.name} | Let's Chat With` : "Let's Chat With";
      this.titleService.setTitle(title);
    });
  }

  ngOnInit() {
    if (environment.production) {
      this.googleAnalyticsService.initialize();
    }
  }
}
