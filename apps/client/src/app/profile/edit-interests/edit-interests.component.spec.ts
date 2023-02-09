import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ListInterestsGQL } from '@conf-match/api';
import { ModalController } from '@conf-match/shared';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { take, skip } from 'rxjs/operators';
import { EditInterestsComponent } from './edit-interests.component';

describe('Component: EditInterestsComponent', () => {
  let listInterestsGql;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditInterestsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ListInterestsGQL,
          useValue: jasmine.createSpyObj('listInterestsGQL', {
            fetch: () => of(true),
          }),
        },
        { provide: ModalController, useValue: { close: () => {} } },
        provideMockStore({
          initialState: {
            core: {
              conferenceId: 'testConference',
              conference: {
                testConference: {
                  interests: {
                    items: [
                      { interest: { id: '1', name: 'React' } },
                      { interest: { id: '2', name: 'Redux' } },
                    ],
                  },
                },
              },
              attendee: {
                id: '23',
                interests: ['JavaScript', 'React', 'Redux'],
              },
            },
          },
        }),
      ],
    }).compileComponents();

    listInterestsGql = TestBed.inject(ListInterestsGQL);
  }));

  it('renders without crashing', () => {
    // ARRANGE
    const fixture = TestBed.createComponent(EditInterestsComponent);

    // ASSERT
    expect(fixture).toBeTruthy();
  });

  it('correctly determines the interests that are available for display', waitForAsync(() => {
    // ARRANGE
    listInterestsGql.fetch.and.returnValue(
      of({
        data: {
          listInterests: {
            items: [
              { id: '1', group: 'Technology', name: 'React' },
              { id: '2', group: 'Technology', name: 'Redux' },
              { id: '3', group: 'Technology', name: 'JavaScript' },
            ],
          },
        },
      })
    );

    const fixture = TestBed.createComponent(EditInterestsComponent);

    // ACT
    fixture.detectChanges();
    fixture.componentInstance.interests$.pipe(skip(1), take(1)).subscribe((mappedInterests) => {
      // ASSERT
      expect(mappedInterests.length).toEqual(2);
      expect(mappedInterests[0].name).toEqual('React');
      expect(mappedInterests[1].name).toEqual('Redux');
    });
  }));
});
