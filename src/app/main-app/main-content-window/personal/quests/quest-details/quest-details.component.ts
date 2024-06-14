import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {QuestsService} from '../services/quests.service';
import {ProgressBarDirective} from "../../../../../shared/directives/progress-bar.directive";
import {AsyncPipe, NgStyle} from "@angular/common";
import {EventItemComponent} from "./event-item/event-item.component";
import {type EventItem} from "../models/evenItem.model";
import {ProgressBarCardComponent} from "../../../../../shared/components/progressBarCard.component";
import {Progress} from "../../../../../shared/models/progressBarModel";
import {LeftTimeToFinishPipe} from "../../../../../shared/pipes/left-time-to-finish.pipe";

@Component({
  selector: 'app-quest-details',
  standalone: true,
  imports: [
    ProgressBarDirective,
    NgStyle,
    EventItemComponent,
    ProgressBarCardComponent,
    AsyncPipe,
    LeftTimeToFinishPipe
  ],
  templateUrl: './quest-details.component.html',
  styleUrls: ['./quest-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuestDetailsComponent{
  constructor(private questService: QuestsService) {}

  get selectedQuest(){
    return this.questService.questSelectedSubject.getValue();
  }
  get overallAmount(){
    return this.selectedQuest.progressArgs[1];
  }
  get collectedAmount(){
    return this.selectedQuest.progressArgs[0];
  }
  get itemName(){
    return this.selectedQuest.progressArgs[2];
  }
  get additionalInfo(){
    return null;
  }
  get progress(): Progress{
    return {progress: this.collectedAmount, overall: this.overallAmount};
  }
  get events(): EventItem[] {
    return this.selectedQuest.progressArgs;
  }

}
