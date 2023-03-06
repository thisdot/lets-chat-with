import {
  getSocialLink,
  getSocialProfile,
  isValidSocialURL,
  sanitizeSocialURL,
} from './sanitize-social-url';

describe(`isValidSocialURL`, () => {
  it(`returns false if the URL is empty`, () => {
    const result = isValidSocialURL();
    expect(result).toBe(false);
  });

  it(`returns false if the URL is incorrect`, () => {
    const result = isValidSocialURL('blah');
    expect(result).toBe(false);
  });

  it(`returns true if the URL is correct`, () => {
    const result = isValidSocialURL('https://thisdot.co');
    expect(result).toBe(true);
  });
});

describe(`sanitizeSocialURL`, () => {
  it(`returns a desktop-friendly social URL`, () => {
    const result = sanitizeSocialURL('https://twitter.com/thisdotlabs', false);
    expect(result).toBe('https://twitter.com/thisdotlabs');
  });

  it(`returns a mobile-friendly social URL`, () => {
    const result = sanitizeSocialURL('https://twitter.com/thisdotlabs', true);
    expect(result).toBe('https://mobile.twitter.com/thisdotlabs');
  });
});

describe(`getSocialProfile`, () => {
  it(`returns profile info from a social link`, () => {
    const result = getSocialProfile('https://twitter.com/thisdotlabs', false);
    expect(result).toEqual({
      profileName: 'twitter',
      sanitizedURL: 'https://twitter.com/thisdotlabs',
      username: 'thisdotlabs',
    });
  });
});

describe(`getSocialLink`, () => {
  it(`returns a valid social link if provided`, () => {
    const result = getSocialLink('twitter', 'https://twitter.com/thisdotlabs', false);
    expect(result).toBe('https://twitter.com/thisdotlabs');
  });

  it(`returns a valid social link if the social profile and username are provided`, () => {
    const result = getSocialLink('twitter', 'thisdotlabs', false);
    expect(result).toBe('https://twitter.com/thisdotlabs');
  });
});
