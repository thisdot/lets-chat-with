import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { EventDataService } from '../../conferences/join-conference/event-data.service';

@Component({
  selector: 'cm-top-nav-conference-logo',
  templateUrl: './top-nav-conference-logo.component.html',
  styleUrls: ['./top-nav-conference-logo.component.scss'],
})
export class TopNavConferenceLogoComponent {
  conference = this.eventDataService.getLastEvent();

  constructor(private readonly eventDataService: EventDataService) {}
}
