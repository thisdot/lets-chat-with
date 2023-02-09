import { AttendeeModel, Identifier, Interest } from '../../';

/**
 * This mapper is responsible for mapping raw GraphQL attendee object to its respective model.
 * For example, the below code will be mapped to interests: {id: string; name: string}[].
 *
 * <code>
 * interests: {
 *    items: [
 *      {
 *        interest: {
 *          id: '44994c7d-8078-4b12-9d68-9b52d652e02f',
 *          name: 'Project Management',
 *          __typename: 'Interest'
 *        },
 *        __typename: 'AttendeeInterest'
 *      },
 *      // ...
 *    ],
 *    __typename: 'ModelAttendeeInterestConnection'
 *  },
 * </code>
 */
export function mapAttendeeToAttendeeModel(attendee: any): AttendeeModel {
  return {
    ...attendee,
    interests: attendee?.interests?.items
      ?.map(({ interest }: { interest: Interest }) => ({
        id: interest.id,
        name: interest.name,
      }))
      .filter(Boolean),
    ownIdentifiers: attendee?.ownIdentifiers?.items
      ?.map(({ identifier }: { identifier: Identifier }) => ({
        id: identifier.id,
        name: identifier.name,
      }))
      .filter(Boolean),
    desiredIdentifiers: attendee?.desiredIdentifiers?.items
      ?.map(({ identifier }: { identifier: Identifier }) => ({
        id: identifier.id,
        name: identifier.name,
      }))
      .filter(Boolean),
  };
}
