import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { EventDataService } from '../join-conference/event-data.service';
import { EventModel } from '@conf-match/api';
import { ConferenceResolversModule } from './conference-resolvers.module';

@Injectable({
  providedIn: ConferenceResolversModule,
})
export class ConferenceResolver implements Resolve<EventModel> {
  constructor(private readonly eventDataService: EventDataService) {}

  /**
   * This resolver is used for different subroutes. Some of subroutes will not have conferenceId,
   * so they'll need to retrieve it from parent subroute. Hence this method.
   * @param activatedRouteSnapshot
   * @private
   */
  private getAllRouteParameters(activatedRouteSnapshot: ActivatedRouteSnapshot) {
    return {
      ...activatedRouteSnapshot.params,
      ...activatedRouteSnapshot.children.reduce(
        (acc, child) => ({ ...this.getAllRouteParameters(child), ...acc }),
        {}
      ),
    };
  }

  resolve(
    activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<EventModel> {
    const conferenceId = this.getAllRouteParameters(state.root).conferenceId;
    return this.eventDataService.findEventById(conferenceId);
  }
}
