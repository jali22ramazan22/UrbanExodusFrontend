import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Perk, Skill} from "../../../../shared/models/skillModels/skill.model";
@Injectable({
  providedIn: 'root'
})
export class SkillsService {


  //for reactive programming purposes
  skillInfoPanelSelected = new BehaviorSubject<string>('skill-navigation');
  skillsSelectedSubject = new BehaviorSubject<string>(null);
  skillsSelectedPerksSubject = new BehaviorSubject<Perk[]>(null);
  perkSelectedSubject = new BehaviorSubject<Perk>(null);

  //from server data
  //TODO: rewrite it to behavior subject because it may able to change
  Skills: Skill[] = this.fetchUserSkillsData();


  constructor() { }

  calculateDepth(perks: Perk[]): number {
    if(!perks){
      return 0;
    }
    const width = this.calculateWidth(perks);
    return width.length;
  }

  calculateWidth(perks: Perk[]): number[] {
    if(!perks){
      return null;
    }
    let levelCounts: number[] = [];
    const countNodesAtLevel = (nodeId: number, level: number) => {
      if (level >= levelCounts.length) {
        levelCounts.push(0);
      }
      levelCounts[level]++;
      perks.forEach(perk => {
        if (perk.parent_id === nodeId || (Array.isArray(perk.parent_id) && perk.parent_id.includes(nodeId))) {
          countNodesAtLevel(perk.id, level + 1);
        }
      });
    };
    perks.forEach(perk => {
      if (perk.parent_id === null) {
        countNodesAtLevel(perk.id, 0);
      }
    });
    return levelCounts;
  }

  //just hardcoding
  fetchUserSkillsData(): Skill[] {
    return [
      new Skill('Нетраннинг', [
        new Perk('Оптимизация Скриптов', true, ['Увеличение получаемых бонусов на 50%.'], 1, null),
        new Perk('Начинающий Хакер', false, ['Дополнительные 20% к получаемым деньгам за успешный взлом.'], 2, 1),
        new Perk('Продвинутый Хакер', false, ['Возможность продажи улучшенного софта с надбавкой в 30%.'], 3, 2),
        new Perk('Предсказывательная Нейросеть', false, ['Дополнительные 25% опыта за выполнение заданий, основанных на предсказанных событиях.'], 4, 3),
        new Perk('Кибер-Кража', false, ['Получение случайного предмета или валюты из профиля, который был взломан.'], 5, 3),
        new Perk('Фаервол', false, ['Пассивная защита от 20% от получаемого урона от попыток взлома.'], 6, 3),
        new Perk('Электронный призрак',false, ['Увеличение скорости регенерации здоровья после успешного взлома на 50%.'], 7, 4),
        new Perk('Устаревшие протоколы', false, ['Возможность получить доступ к уникальным предметам, недоступным иным способом.'], 8, 5),
        new Perk('Знания - Сила', false, ['Увеличение прибыли от продажи собственного софта на 50%.'], 9, 6),
        new Perk('Нетраннер', false, ['Доступ к уникальным миссиям и предметам, связанным с хакерской деятельностью.'], 10, 9)
      ]),

    ];
  }

}

