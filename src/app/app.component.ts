import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  interval?: any;

  endHours = '23';
  endMinutes = '00';

  constructor() {
    this.endHours = localStorage.getItem('hours') || this.endHours;
    this.endMinutes = localStorage.getItem('minutes') || this.endMinutes;
  }

  get endTime() {
    return moment(`${this.endHours}:${this.endMinutes}:00`, 'HH:mm:ss');
  }

  get hoursLeft() {
    return this.endTime.diff(moment(), 'hours');
  }

  get minutesLeft() {
    return this.endTime.diff(moment(), 'minutes') % 60;
  }

  get secondsLeft() {
    return this.endTime.diff(moment(), 'seconds') % 60;
  }

  handleChange(event: Event, type: 'hours' | 'minutes') {
    const value = (event.target as HTMLTextAreaElement).value || '00';

    localStorage.setItem(type, value);
  }

  startTimer() {
    this.interval = setInterval(() => {}, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.pauseTimer();
  }
}
