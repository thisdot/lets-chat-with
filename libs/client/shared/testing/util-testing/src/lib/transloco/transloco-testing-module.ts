import {
  HashMap,
  Translation,
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@ngneat/transloco';

export function getTranslocoTestingModule(
  options: TranslocoTestingOptions = {},
  langs: HashMap<Translation> = {}
) {
  return TranslocoTestingModule.forRoot({
    langs,
    translocoConfig: {
      availableLangs: ['en'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
