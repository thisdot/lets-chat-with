import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringSeparator',
})
export class StringSeparatorPipe implements PipeTransform {
  transform(stringValues: string[]): string {
    let finalString = '';

    if (stringValues.length === 0) {
      return finalString;
    }

    const firstValue = stringValues[0];
    const secondValue = stringValues[1];

    if (firstValue && secondValue) {
      finalString = `${firstValue}, ${secondValue}`;
    } else if (firstValue && !secondValue) {
      finalString = firstValue;
    } else if (!firstValue && secondValue) {
      finalString = secondValue;
    }
    return finalString;
  }
}
