import {Component, OnInit, OnDestroy, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Subscription } from 'rxjs';
import { computeImagePath } from '../../../../../../shared/functions/ImgPath';
import { NavbarLoaderService } from '../../../../../../shared/services/navbar-loader.service';
import { navbarModel } from '../../../../../../shared/models/UIModels/navbarModel';
import { MarketService } from '../../../market.service';
import {NgClass} from "@angular/common";
import {ClickOutsideDirective} from "../../../../../../shared/directives/click-outside.directive";
//TODO: implement click outside handling

@Component({
  selector: 'app-sorting-dropdown',
  standalone: true,
  imports: [
    NgClass,
    ClickOutsideDirective
  ],
  templateUrl: './sorting-dropdown.component.html',
  styleUrls: ['./sorting-dropdown.component.css']
})
export class SortingDropdownComponent implements OnInit, OnDestroy{
  @Input() isMenuOpened!: boolean;
  dropdownContentItems: navbarModel[] = [];
  selectedOption: string = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private navbarLoaderService: NavbarLoaderService,
    private marketService: MarketService
  ) {}

  ngOnInit() {
    const navbarSubscription = this.navbarLoaderService
      .buildNavbarArray('market', 'sorting-panel')
      .subscribe({
      next: navbar => this.dropdownContentItems = navbar,
      error: err => console.error('Failed to load navbar items', err)
    });
    this.subscriptions.add(navbarSubscription);
  }

  onHandleClickOutside(){
    this.isMenuOpened = false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onToggleCondition() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  onSelectSorting(item: navbarModel) {
    if (!item) {
      return;
    }
    if(item.value === 'Очистить'){
      item.type = null;
      this.selectedOption = null;
    } else{
      this.selectedOption = item.value;
    }
    this.marketService.selectedSortingSubject.next(item.type);
    this.onToggleCondition();
  }
  protected readonly computeImagePath = computeImagePath;

}
