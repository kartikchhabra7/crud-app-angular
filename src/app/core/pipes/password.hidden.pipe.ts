import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordHidden',
  standalone: true,
})
export class PasswordHiddenPipe implements PipeTransform {
  transform(value: string): string {
    const visibleLength = 2;
    const hiddenLength = value.length - 2 * visibleLength;
    const hiddenCharacters = '*'.repeat(hiddenLength);
    return (
      value.slice(0, visibleLength) +
      hiddenCharacters +
      value.slice(-visibleLength)
    );
  }
}
