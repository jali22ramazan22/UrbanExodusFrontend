import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {computeImagePath} from "../../../../../shared/functions/ImgPath";
import {ProgressBarCardComponent} from "../../../../../shared/components/progressBarCard.component";
import {SkillsService} from "../skills.service";
import {Perk, Skill} from "../../../../../shared/models/skillModels/skill.model";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-level-bonus-info',
  standalone: true,
  imports: [
    ProgressBarCardComponent
  ],
  templateUrl: './level-bonus-info.component.html',
  styleUrl: './level-bonus-info.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LevelBonusInfoComponent implements OnInit, OnDestroy{
  selectedSkillPerksSubscription: Subscription;
  selectedPerks: Perk[];

  protected readonly computeImagePath = computeImagePath;
  constructor(private skillsService: SkillsService) {}

  ngOnInit() {
    this.selectedSkillPerksSubscription = this.skillsService.skillsSelectedPerksSubject
      .subscribe((perks: Perk[]) => {
        this.selectedPerks = perks;

      })
  }

  get bonuses(){
    return this.selectedPerks
      .filter(perk => perk.taken)
      .map(perk => perk.bonuses)
      .flat();
  }



  ngOnDestroy() {
    this.selectedSkillPerksSubscription.unsubscribe();
  }


}
