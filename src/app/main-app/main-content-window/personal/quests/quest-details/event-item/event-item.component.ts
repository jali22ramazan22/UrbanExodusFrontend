import {Component, Input} from '@angular/core';
import {type EventItem} from "../../models/evenItem.model";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-event-item',
  imports: [
    NgStyle
  ],
  standalone: true,
  template: `
    <p class="event-item">
      {{eventItem.title}} -
      <a [ngStyle]="{'color': statusColor}">
        {{statusTitle}}
      </a>
    </p>
  `,
  styles: `
    .event-item{
      display: list-item;
      font-size: 0.8vw;
      margin: 0 0 0 2vw;
    }
  `
})
export class EventItemComponent {
  @Input() eventItem!: EventItem;

  constructor() {
  }

  get statusColor(): string{
    return this.eventItem.completed ? 'green' : 'red';
  }
  get statusTitle(): string{
    return this.eventItem.completed ? 'Выполнено' : 'Не выполнено';
  }

}
