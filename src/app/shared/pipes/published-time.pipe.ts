import { Pipe, PipeTransform } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Pipe({
  name: 'PublishedTimePipe',
  pure: false,
  standalone: true
})
export class PublishedTimePipe implements PipeTransform {

  transform(value: Date): Observable<string> {
    return interval(100).pipe(
      startWith(0),
      map(() => {
        const currentDate = new Date();
        let elapsedTimeInMillis = currentDate.getTime() - value.getTime();
        let output: string;

        elapsedTimeInMillis = elapsedTimeInMillis / (1000 * 3600);

        if (elapsedTimeInMillis < 1) {
          elapsedTimeInMillis = elapsedTimeInMillis * 60;
          if (Math.round(elapsedTimeInMillis) === 0) {
            output = 'только что';
          } else {
            output = Math.round(elapsedTimeInMillis) + ' минут назад';
          }
        } else if (elapsedTimeInMillis > 24) {
          const elapsedTimeInDays = elapsedTimeInMillis / 24;
          output = Math.round(elapsedTimeInDays) + ' дней назад';
        } else {
          output = Math.round(elapsedTimeInMillis) + ' часов назад';
        }

        return output;
      })
    );
  }
}
