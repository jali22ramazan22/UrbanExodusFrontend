import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgStyle } from '@angular/common';
import { QuestsService } from '../services/quests.service';
import { Subscription } from 'rxjs';
import { Quest } from '../../../../../shared/models/questModels/quest.model';

@Component({
  selector: 'app-quest-list',
  templateUrl: './quest-list.component.html',
  standalone: true,
  imports: [NgStyle, NgClass],
  styleUrls: ['./quest-list.component.css']
})
export class QuestListComponent implements OnInit, OnDestroy {


  //Will leave this Header because it's not that complicated and big
  questTypeHeaderItems = [
    { value: 'Глобальные', type: 'global' },
    { value: 'Сюжетные', type: 'plot' },
    { value: 'Рейдовые', type: 'daily' }
  ];

  questList: Quest[] | null = null;

  private questTypeSubscription: Subscription | null = null;
  constructor(private questService: QuestsService) {}

  ngOnInit(): void {
    this.questTypeSubscription = this.questService.questTypeSubject.subscribe(questType => {
      this.updateQuestList(questType);
    });
    this.updateQuestList(this.questService.questTypeSubject.getValue());
  }

  onSelectQuestType(selectedQuestType: string): void {
    if(selectedQuestType){
      this.questService.questTypeSubject.next(selectedQuestType);
      this.onSelectQuest(null);
    }
  }

  get questTypeSelected(){
    return this.questService.questTypeSubject.getValue()
  }
  get questSelected(){
    return this.questService.questSelectedSubject.getValue();
  }

  updateQuestList(selectedQuestType: string): void {
    this.questList = this.questService.getQuestList(selectedQuestType);
  }

  onSelectQuest(selectedQuest: Quest | null): void {
      this.questService.questSelectedSubject.next(selectedQuest);
  }

  ngOnDestroy(): void {
    this.questTypeSubscription?.unsubscribe();
  }
}
