import { ApiEvent, EventModel } from '@conf-match/api';

const DEFAULT_MAX_INTERESTS = 10;

const DEFAULT_MAX_IDENTIFIERS = 3;

export function getMaximumInterests(event: ApiEvent | EventModel | null): number {
  const maxInterestsOverride = event?.maxInterests;

  return maxInterestsOverride ? maxInterestsOverride : DEFAULT_MAX_INTERESTS;
}

export function getMaximumIdentifiers(event: ApiEvent | EventModel | null): number {
  const maxIdentifiersOverride = event?.maxInterests;

  return maxIdentifiersOverride ? maxIdentifiersOverride : DEFAULT_MAX_IDENTIFIERS;
}
