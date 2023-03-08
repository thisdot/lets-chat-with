import SocialLinks, { TYPE_MOBILE } from 'social-links';

const socialLinks = new SocialLinks();

/** Builds the social link from a username and profile combo if the URL isn't provided. */
export const getSocialLink = (profileName: string, username: string, isMobile: boolean) => {
  if (isMobile) {
    return socialLinks.getLink(profileName, username, TYPE_MOBILE);
  }
  return socialLinks.getLink(profileName, username);
};
