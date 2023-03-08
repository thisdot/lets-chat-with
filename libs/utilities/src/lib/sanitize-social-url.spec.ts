import { getSocialLink } from './sanitize-social-url';

describe(`getSocialLink`, () => {
  it(`returns a valid social link if the social profile and username are provided`, () => {
    const result = getSocialLink('twitter', 'thisdotlabs', false);
    expect(result).toBe('https://twitter.com/thisdotlabs');
  });
});
