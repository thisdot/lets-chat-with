import { retryWhen, delay, concatMap } from 'rxjs/operators';
import { iif, Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Repeats unsuccessful http requests unless a 404 is encountered
 *
 * @param maxNumberOfRetries Number of retries allowed. Default is 3
 * @param retryInterval Number of milliseconds between tries. Default is 2000
 */
export const retry =
  (maxNumberOfRetries: number = 3, retryInterval: number = 2000) =>
  <T>(source: Observable<T>) => {
    const excludedStatusCodes = [404];
    return source.pipe(
      retryWhen((errors) =>
        errors.pipe(
          concatMap((error: any, i: Number) =>
            iif(
              () =>
                i >= maxNumberOfRetries ||
                (error instanceof HttpErrorResponse &&
                  (excludedStatusCodes.find((e) => e === error.status) ?? 0) > 0),
              throwError(error),
              of(error).pipe(delay(retryInterval))
            )
          )
        )
      )
    );
  };
