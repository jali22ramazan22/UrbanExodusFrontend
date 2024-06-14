import {Component, OnDestroy, OnInit} from '@angular/core';
import {computeImagePath} from "../../../../../../shared/functions/ImgPath";
import {navbarModel} from "../../../../../../shared/models/UIModels/navbarModel";
import {Subscription} from "rxjs";
import {NavbarLoaderService} from "../../../../../../shared/services/navbar-loader.service";
import {MarketService} from "../../../market.service";
import {ClickOutsideDirective} from "../../../../../../shared/directives/click-outside.directive";

@Component({
  selector: 'app-provider-dropdown',
  standalone: true,
  imports: [
    ClickOutsideDirective
  ],
  templateUrl: './provider-dropdown.component.html',
  styleUrl: './provider-dropdown.component.css'
})
export class ProviderDropdownComponent implements OnInit, OnDestroy {


  providerContentItems: navbarModel[] = [];
  isMenuOpened = false;
  selectedOption: string = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private navbarLoaderService: NavbarLoaderService,
    private marketService: MarketService
  ) {}

  ngOnInit() {
    const navbarSubscription = this.navbarLoaderService
      .buildNavbarArray('market', 'provider-panel')
      .subscribe({
        next: navbar => this.providerContentItems = navbar,
        error: err => console.error('Failed to load navbar items', err)
      });
    this.subscriptions.add(navbarSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onToggleCondition() {
    this.isMenuOpened = !this.isMenuOpened;
  }

  onSelectProvider(item: navbarModel) {
    if (!item) {
      return;
    }
    if(item.value == 'Очистить'){
      item.type = null;
      this.selectedOption = null;
    } else {
      this.selectedOption = item.value;
    }

    this.marketService.selectedProviderSubject.next(item.type);
    this.onToggleCondition();
  }
  protected readonly computeImagePath = computeImagePath;

  onHandleClickOutside() {
    this.isMenuOpened = false;
  }
}
