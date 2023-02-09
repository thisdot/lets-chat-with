import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EventModel,
  GetEventGQL,
  mapEventIdentifiersToIdentifierModels,
  mapEventInterestsToInterestModels,
} from '@conf-match/api';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EventDataService {
  private lastEvent: EventModel;

  constructor(private readonly getEvent: GetEventGQL) {}

  getLastEvent(): EventModel | undefined {
    return this.lastEvent;
  }

  findEventById(id: string): Observable<EventModel> {
    return this.getEvent
      .fetch({
        id,
      })
      .pipe(
        map((response) => response.data.getEvent),
        map((apiEvent) => {
          const { interests, identifiers, ...rootFields } = apiEvent;

          return {
            ...rootFields,
            interests: mapEventInterestsToInterestModels(apiEvent.interests),
            identifiers: mapEventIdentifiersToIdentifierModels(apiEvent.identifiers),
          } as EventModel;
        }),
        tap((event: EventModel) => {
          this.lastEvent = event;
        })
      );
  }
}
