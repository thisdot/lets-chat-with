import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { LayoutActionsService } from '../../layout/layout-actions.service';
import { EventDataService } from './event-data.service';

@Component({
  selector: 'cm-join-conference',
  templateUrl: './join-conference.component.html',
  styleUrls: ['./join-conference.component.scss'],
})
export class JoinConferenceComponent implements OnInit, OnDestroy {
  destroy = new Subject<void>();
  conference$ = this.activatedRoute.data.pipe(map((data) => data.conference));

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventRetrievingService: EventDataService,
    private layoutActionService: LayoutActionsService
  ) {}

  ngOnInit(): void {
    this.layoutActionService.back$
      .pipe(
        tap(
          (_) =>
            void this.router.navigate(['../../'], {
              relativeTo: this.activatedRoute,
            })
        ),
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
