import { Conference } from '../../../models';
import { conferencesMock } from '../../../utils/test-utils';
import { selectAttendeeConferencesToSelect } from './conferences.selectors';

describe('Conferences Selectors', () => {
  describe('selectAttendeeConferencesToSelect', () => {
    it('should filter out the selected conference from the list of conferences to select', () => {
      const expected = [...conferencesMock.slice(0, 1), ...conferencesMock.slice(2)];

      const actual = selectAttendeeConferencesToSelect.projector(
        conferencesMock,
        conferencesMock[1]
      );

      expect(actual).toEqual(expected);
    });
  });
});
