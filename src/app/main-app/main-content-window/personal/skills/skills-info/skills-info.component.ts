import {Component, Input, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';
import { computeImagePath} from "../../../../../shared/functions/ImgPath";
import {navbarModel, NavbarModelBuilder} from "../../../../../shared/models/UIModels/navbarModel";
import {NgClass, NgOptimizedImage} from "@angular/common";
import {SkillsService} from "../skills.service";
import {map} from "rxjs";
import {Perk, Skill} from "../../../../../shared/models/skillModels/skill.model";

@Component({
  selector: 'app-skills-info',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './skills-info.component.html',
  styleUrl: './skills-info.component.css',

})
export class SkillsInfoComponent{
  @Input() skillsNavbarItems: navbarModel[];
  protected readonly computeImagePath = computeImagePath; //for computing nonNavbarItem images


  constructor(private skillsService: SkillsService) {}

  onSelectSkill(item: string) {
    this.skillsService.skillsSelectedSubject.next(item);
    const selectedSkill = this.skills.find(skill => skill.skillTitle === item);
    if(!selectedSkill){
      this.skillsService.skillsSelectedPerksSubject.next(null);
    } else {
      this.skillsService.skillsSelectedPerksSubject.next(selectedSkill.perks);
    }
  }

  //the method for activating the css class 'selected'
  get selectedSkill(){
    return this.skillsService.skillsSelectedSubject.getValue();
  }

  get skills(): Skill[]{
    return this.skillsService.Skills;
  }

  onSwitchPanel() {
    this.skillsService.skillInfoPanelSelected.next('skill-level');
  }
}
