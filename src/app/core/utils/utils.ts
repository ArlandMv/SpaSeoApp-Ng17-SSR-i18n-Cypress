/*example
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';

export function translateFile(http: HttpClient, lang: string, filePath: string): Observable<string> {
  return http.get<any>(`./assets/i18n/${lang}/${filePath}.json`).pipe(
    switchMap((translations) => {
      return of(JSON.stringify(translations));
    }),
    map((text) => text),
  );
}*/
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


export function translateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
