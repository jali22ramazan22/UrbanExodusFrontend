import {Component, OnInit} from '@angular/core';
import {SkillsService} from "../../skills.service";
import {Perk} from "../../../../../../shared/models/skillModels/skill.model";

@Component({
  selector: 'app-perk-overlay-container',
  standalone: true,
  imports: [],
  templateUrl: './perk-overlay-container.component.html',
  styleUrl: './perk-overlay-container.component.css'
})
export class PerkOverlayContainerComponent implements OnInit {

  perk: Perk;

  constructor(private skillsService: SkillsService) {
  }

  ngOnInit(){
    this.skillsService.perkSelectedSubject.subscribe(
      perk => this.perk = perk
    )
  }

  onClosePerk() {
    this.skillsService.perkSelectedSubject.next(null);
  }
}
