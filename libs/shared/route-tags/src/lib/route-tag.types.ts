export enum RouteTag {
  conference = 'conference',
  connect = 'connect',
  settings = 'settings',
  logout = 'logout',
  edit = 'edit',
  save = 'save',
  back = 'back',
  share = 'share',
  pageWithHeader = 'pageWithHeader',
  displayConferenceLogo = 'displayConferenceLogo',
}

export type RouteData = {
  [key in RouteConfigParam]: any;
};
export type RouteConfigParam = 'cmRouteColor' | 'cmRouteProgressState';
export type NavbarColorScheme = 'primary' | 'secondary';
