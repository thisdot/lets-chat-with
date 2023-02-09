import { OperatorFunction, pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterNotNullOrUndefined<T>(): OperatorFunction<T | null | undefined, T> {
  return pipe(filter(isNotNullOrUndefined));
}

export function isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
  return value != null;
}
