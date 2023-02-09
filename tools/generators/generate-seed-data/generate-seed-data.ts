import { writeFile } from 'fs/promises';
import assert from 'node:assert';
import { resolve } from 'path';

import prompt from 'prompt';
import { dstDirectory } from './constants';
import { createCognitoUsers } from './create-cognito-users';
import { generateAttendee } from './generate/attendee';
import { generateDesiredAttendeeIdentifiers } from './generate/attendeeDesiredIdentifiers';
import { generateAttendeeInterests } from './generate/attendeeInterest';
import { generateOwnAttendeeIdentifiers } from './generate/attendeeOwnIdentifiers';
import { generateCandidates } from './generate/candidate';
import { generateEvents } from './generate/event';
import { generateEventIdentifiers } from './generate/event-intentifiers';
import { generateEventInterests } from './generate/event-interests';
import { generateStaticData } from './generate/static-data';
import { generateUsers } from './generate/user';

main();

async function main() {
  const { profile, cognitoUserPoolId, email, emailCount } = await prompt.get([
    {
      description: 'What AWS profile are you using? (Leave empty for default)',
      name: 'profile',
      default: process.env.AWS_PROFILE,
    },
    {
      description: 'What is your Cognito user pool id?',
      name: 'cognitoUserPoolId',
    },
    {
      description:
        'Enter test user email address. We will generate users in the following format: <username>+<number>@<domain>',
      name: 'email',
    },
    {
      description: 'How many users do you want to generate?',
      name: 'emailCount',
    },
  ]);

  assert(typeof profile === 'string');
  assert(typeof cognitoUserPoolId === 'string');
  assert(typeof email === 'string');
  assert(typeof emailCount === 'string');

  const emailSplitRegExp = /(?<username>.*)@(?<domain>.*)/;
  const match = emailSplitRegExp.exec(email);

  const username = match.groups.username;
  const domain = match.groups.domain;

  const emails = new Array(parseInt(emailCount))
    .fill(0)
    .map((_, idx) => `${username}+${('0' + (idx + 1)).slice(-2)}@${domain}`);

  console.log(`Will generate users for emails:\n${emails.join('\n')}`);
  console.log(`Using pool: ${cognitoUserPoolId}`);

  await generateSeedData({
    emails,
    profile,
    cognitoUserPoolId,
  });
}

async function generateSeedData(options: {
  emails: string[];
  profile: string;
  cognitoUserPoolId: string;
}) {
  await generateStaticData();

  const cognitoUsers = await createCognitoUsers(options);

  const users = generateUsers(cognitoUsers);
  const attendees = generateAttendee(users);
  const events = generateEvents(attendees);
  const eventIdentifiers = generateEventIdentifiers(events);
  const eventInterests = generateEventInterests(events);
  const attendeeInterests = generateAttendeeInterests(attendees, 10);
  const attendeeDesiredIdentifiers = generateDesiredAttendeeIdentifiers(attendees, 5);
  const attendeeOwnIdentifiers = generateOwnAttendeeIdentifiers(attendees, 5);
  const candidates = generateCandidates(attendees);

  await writeSeedData({
    user: users,
    attendee: attendees,
    event: events,
    eventIdentifier: eventIdentifiers,
    eventInterest: eventInterests,
    attendeeInterest: attendeeInterests,
    attendeeDesiredIdentifier: attendeeDesiredIdentifiers,
    attendeeOwnIdentifier: attendeeOwnIdentifiers,
    candidate: candidates,
  });
}

async function writeSeedData(data: Record<string, unknown>) {
  await Promise.all(
    Object.entries(data).map(([key, value]) =>
      writeFile(resolve(dstDirectory, `${key}.json`), JSON.stringify(value, undefined, 2))
    )
  );
}
