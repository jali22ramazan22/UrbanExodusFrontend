import {
  AfterViewChecked,
  AfterViewInit,
  Component, ElementRef, OnChanges,
  OnDestroy,
  OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {SkillsService} from "../skills.service";
import {Perk} from "../../../../../shared/models/skillModels/skill.model";
import {debounceTime, map, Observable, startWith, Subscription} from "rxjs";
import {PerkBlockComponent} from "./perk-block/perk-block.component";
import {NgForOf, NgStyle} from "@angular/common";
import {AbsoluteOverlayComponent} from "../../../../../shared/components/absolute-overlay/absolute-overlay.component";
import {PerkOverlayContainerComponent} from "./perk-overlay-container/perk-overlay-container.component";
import {CdkPortal} from "@angular/cdk/portal";
import {Overlay, OverlayConfig} from "@angular/cdk/overlay";



declare var LeaderLine: any;

@Component({
  selector: 'app-skills-details',
  standalone: true,
  imports: [
    PerkBlockComponent,
    NgStyle,
    NgForOf,
    AbsoluteOverlayComponent,
    PerkOverlayContainerComponent,
    CdkPortal,


  ],
  templateUrl: './skills-details.component.html',
  styleUrl: './skills-details.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SkillsDetailsComponent implements OnInit, OnDestroy{
  @ViewChild(CdkPortal) portal!: CdkPortal;
  //data for building tree
  depth: number = 0;
  width = null;
  perks: Perk[] = null;
  selectedSkillSubscription: Subscription = null;

  constructor(private skillsService: SkillsService, private overlay: Overlay) {}

  ngOnInit() {
    this.selectedSkillSubscription = this.skillsService.skillsSelectedPerksSubject.subscribe(
      selectedPerks=> {
        this.perks = selectedPerks;
        this.width = this.skillsService.calculateWidth(this.perks);
        this.depth = this.skillsService.calculateDepth(this.perks);

      })

  }

  ngAfterViewInit() {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });
    const overlayRef = this.overlay.create(config);
    overlayRef.attach(this.portal);
  }

  onSelectPerk(perk: Perk) {
    this.skillsService.perkSelectedSubject.next(perk);
  }

  get selectedPerk(){
    return this.skillsService.perkSelectedSubject.getValue();
  }

  cumulativeLength(index: number) {
    let acc = 0;
    for (let i = 0; i < index; i++) {
      acc += this.width[i];
    }
    return acc;
  }

  ngOnDestroy(){
    this.selectedSkillSubscription.unsubscribe();
  }
  protected readonly Array = Array;
}
