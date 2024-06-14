import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Quest, GlobalQuest, PlotQuest, DailyQuest, QuestFactory} from "../../../../../shared/models/questModels/quest.model";

import {computeImagePath} from "../../../../../shared/functions/ImgPath";
@Injectable({
  providedIn: 'root'
})
export class QuestsService {
  questTypeSubject = new BehaviorSubject<string>('global');
  questSelectedSubject = new BehaviorSubject<Quest>(null);

  plotQuests: PlotQuest[] = [];
  dailyQuests: DailyQuest[] = [
    QuestFactory.createQuest(
      'daily',
      'Убить 5 ЧВК',
      'Нынешним Владельцам Сети не понравилось, как ведут дела мои коллеги. ' +
      'Но марать свои руки они не хотят, вот и я решился сделать это дело за них.',
      computeImagePath('firearm.png'),
      'countType',
      [4, 5, 'ЧВК'],
      new Date(2024, 5, 15, 10, 30),
      null
    ) as DailyQuest
  ];

  globalQuests: GlobalQuest[] = [
    QuestFactory.createQuest(
      'global',
      'Подключить Вышку',
      'Вышка Города - это важный стратегический объект, включение которого очень сильно бы улучшило коммуникацию и качество Сети.',
      computeImagePath('scouting.png'),
      'eventType',
      [
        {title: 'Найти Вышку', completed: true},
        {title: 'Найти место Активации', completed: true},
        {title: 'Достать место Активации', completed: false},
      ],
      null
    )
  ];
  constructor() {}

  getQuestList(questType: string): Quest[] | null {
    switch (questType) {
      case 'global':
        return this.globalQuests.slice();
      case 'daily':
        return this.dailyQuests.slice();
      case 'plot':
        return this.plotQuests.slice();
      default:
        return null;
    }
  }


}
