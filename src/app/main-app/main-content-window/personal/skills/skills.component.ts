import {Component, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {LevelBonusInfoComponent} from "./level-bonus-info/level-bonus-info.component";
import {SkillsInfoComponent} from "./skills-info/skills-info.component";
import {SkillsDetailsComponent} from "./skills-details/skills-details.component";
import {SkillsLevelDashboardComponent} from "./skills-level-dashboard/skills-level-dashboard.component";
import {navbarModel, NavbarModelBuilder} from "../../../../shared/models/UIModels/navbarModel";
import {SkillsService} from "./skills.service";
import {NavbarLoaderService} from "../../../../shared/services/navbar-loader.service";
import {take} from "rxjs";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    LevelBonusInfoComponent,
    SkillsInfoComponent,
    SkillsDetailsComponent,
    SkillsLevelDashboardComponent
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  encapsulation: ViewEncapsulation.None

})
export class SkillsComponent implements OnInit{
  skillsNavbarItems: navbarModel[];

  constructor(private skillService: SkillsService, private navbarLoaderService: NavbarLoaderService) {
  }

  ngOnInit() {
    this.navbarLoaderService.buildNavbarArray('skills', 'skillsNavbarItems').pipe()
      .subscribe(navbar => {this.skillsNavbarItems = navbar; });
  }

  get currentPanel(){
    return this.skillService.skillInfoPanelSelected.getValue()
  }
}
