import {Component, Input} from '@angular/core';
import {navbarModel} from "../../../../../shared/models/UIModels/navbarModel";
import {SkillsService} from "../skills.service";
import {LevelColorDirective} from "../../../../../shared/directives/levelColor.directive";
import {Subscription} from "rxjs";
import {Perk, Skill} from "../../../../../shared/models/skillModels/skill.model";

@Component({
  selector: 'app-skills-level-dashboard',
  standalone: true,
  imports: [
    LevelColorDirective
  ],
  templateUrl: './skills-level-dashboard.component.html',
  styleUrl: './skills-level-dashboard.component.css'
})
export class SkillsLevelDashboardComponent {
  @Input() skillsNavbarItems: navbarModel[];
  skills: Skill[];


  constructor(private skillsService: SkillsService) {

  }

  ngOnInit(){
    this.skills = this.skillsService.Skills;
  }

  onCalculateSkillsLevel(skill: Skill): number{
    const perksArray = skill.perks;

    let overallLevel = 0;
    for(let i = 0; i < perksArray.length; i++){
      if(perksArray[i].taken){
        overallLevel++;
      }
    }
    return overallLevel;
  }


  onSwitchPanel() {
    this.skillsService.skillInfoPanelSelected.next('skill-navigation');
  }

}
