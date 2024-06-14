import { Pipe, PipeTransform } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Pipe({
  name: 'leftTimeToFinish',
  pure: false,
  standalone: true
})
export class LeftTimeToFinishPipe implements PipeTransform {

  transform(value: Date): Observable<string> {
    return interval(1000).pipe(
      startWith(0),
      map(() => {
        const currentDate = new Date();
        let elapsedTimeInMillis = value.getTime() - currentDate.getTime();

        // Check if time has already passed
        if (elapsedTimeInMillis <= 0) {
          return '00:00:00';
        }

        // Calculate hours, minutes, seconds
        let seconds = Math.floor(elapsedTimeInMillis / 1000);
        let hours = Math.floor(seconds / 3600);
        seconds = seconds % 3600;
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        // Format to HH:MM:SS
        const hoursStr = this.padNumber(hours, 2);
        const minutesStr = this.padNumber(minutes, 2);
        const secondsStr = this.padNumber(seconds, 2);

        return `${hoursStr}:${minutesStr}:${secondsStr}`;
      })
    );
  }

  private padNumber(num: number, length: number): string {
    return ('0' + num).slice(-length);
  }

}
