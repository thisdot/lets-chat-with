import {
  IdentifierModel,
  InterestModel,
  ModelEventIdentifierConnection,
  ModelEventInterestConnection,
  ModelIdentifierConnection,
  ModelInterestConnection,
} from '../../index';

import { isNotNullOrUndefined } from '@conf-match/utilities';

export function mapEventInterestsToInterestModels(
  interestConnection: ModelEventInterestConnection
): InterestModel[] {
  return (
    interestConnection.items?.filter(isNotNullOrUndefined).map(({ interest }) => ({
      id: interest?.id ?? '',
      name: interest?.name ?? '',
      group: interest?.group ?? '',
    })) ?? []
  );
}

export function mapEventIdentifiersToIdentifierModels(
  identifierConnection: ModelEventIdentifierConnection
): IdentifierModel[] {
  return (
    identifierConnection.items?.filter(isNotNullOrUndefined).map(({ identifier }) => {
      return {
        id: identifier?.id ?? '',
        name: identifier?.name ?? '',
      };
    }) ?? []
  );
}

export function mapGlobalIdentifiersToIdentifierModels(
  identifierConnection: ModelIdentifierConnection
): IdentifierModel[] {
  return (
    identifierConnection.items?.filter(isNotNullOrUndefined).map(({ id, name }) => {
      return {
        id: id ?? '',
        name: name ?? '',
      };
    }) ?? []
  );
}

export function mapGlobalInterestsToInterestModels(
  interestConnection: ModelInterestConnection
): InterestModel[] {
  return (
    interestConnection.items?.filter(isNotNullOrUndefined).map(({ id, name, group }) => {
      return {
        id: id ?? '',
        name: name ?? '',
        group: group ?? '',
      };
    }) ?? []
  );
}
