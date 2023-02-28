import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringSeparator',
})
export class StringSeparatorPipe implements PipeTransform {
  transform(stringValues: string[]): string {
    if (stringValues.length === 0) {
      return '';
    }

    const [firstValue, secondValue] = stringValues;

    if (firstValue && secondValue) {
      return `${firstValue}, ${secondValue}`;
    } else if (firstValue && !secondValue) {
      return firstValue;
    } else if (!firstValue && secondValue) {
      return secondValue;
    }
  }
}
