import SocialLinks, { TYPE_MOBILE } from 'social-links';

const socialLinks = new SocialLinks();

/** Detects whether socialURL is valid */
export const isValidSocialURL = (socialUrl: string = ''): boolean => {
  return /^(http|https):\/\/[^ "]+$/.test(socialUrl);
};

/** Sanitizes the social URL if it's valid. Otherwise, returns the entered URL.  */
export const sanitizeSocialURL = (usernameOrSocialURL: string, isMobile: boolean): string => {
  const profileName = socialLinks.detectProfile(usernameOrSocialURL);

  if (isValidSocialURL(usernameOrSocialURL)) {
    if (isMobile) {
      return socialLinks.sanitize(profileName, usernameOrSocialURL, TYPE_MOBILE);
    }
    return socialLinks.sanitize(profileName, usernameOrSocialURL);
  }

  return usernameOrSocialURL;
};

/** Extracts the profile info from a given social URL. */
export const getSocialProfile = (usernameOrSocialURL: string, isMobile: boolean) => {
  const profileName = socialLinks.detectProfile(usernameOrSocialURL);

  if (!profileName || !isValidSocialURL(usernameOrSocialURL)) {
    return { profileName, sanitizedURL: '', username: '' };
  }

  const sanitizedURL = sanitizeSocialURL(usernameOrSocialURL, isMobile);
  const username = socialLinks.getProfileId(profileName, usernameOrSocialURL);

  return { profileName, sanitizedURL, username };
};

/** Builds the social link from a username and profile combo if the URL isn't provided. */
export const getSocialLink = (
  profileName: string,
  usernameOrSocialURL: string,
  isMobile: boolean
) => {
  if (profileName && isValidSocialURL(usernameOrSocialURL)) {
    return usernameOrSocialURL;
  }

  if (isMobile) {
    return socialLinks.getLink(profileName, usernameOrSocialURL, TYPE_MOBILE);
  }
  return socialLinks.getLink(profileName, usernameOrSocialURL);
};
