import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirstLetter'
})
export class CapitalizeFirstLetterPipe implements PipeTransform {
  transform(value: string | null, ...args: unknown[]): string | null {
    if (value) return value.substr(0, 1).toUpperCase() + value.substr(1);
    return null;
  }
}
