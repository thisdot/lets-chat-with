import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';

declare var gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService {
  constructor(private router: Router) {}

  public initialize() {
    this.onRouteChange();

    try {
      const gTagScript = document.createElement('script');
      gTagScript.async = true;
      gTagScript.src =
        'https://www.googletagmanager.com/gtag/js?id=' + environment.googleAnalyticsId;
      document.head.appendChild(gTagScript);

      const dataLayerScript = document.createElement('script');
      dataLayerScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${environment.googleAnalyticsId}', {'send_page_view': false});
      `;
      document.head.appendChild(dataLayerScript);
    } catch (e) {
      console.error('Error adding Google Analytics', e);
    }
  }

  private onRouteChange() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', environment.googleAnalyticsId, {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  public event(action: string, eventCategory?: string, eventLabel?: string, value?: string) {
    gtag('event', action, {
      ...(eventCategory && { event_category: eventCategory }),
      ...(eventLabel && { event_label: eventLabel }),
      ...(value && { value: value }),
    });
  }
}
