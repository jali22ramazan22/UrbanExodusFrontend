import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarketService } from '../market.service';
import { Item } from '../../../../shared/models/itemsModels/item.model';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import {Overlay, OverlayConfig} from '@angular/cdk/overlay';
import { CategoryListComponent } from '../shared/components/category-list/category-list.component';
import { SortingDropdownComponent } from '../shared/components/sorting-dropdown/sorting-dropdown.component';
import { ProviderDropdownComponent } from '../shared/components/provider-dropdown/provider-dropdown.component';
import { FormsModule } from '@angular/forms';
import { CustomFilterPipe } from '../../../../shared/pipes/search-filter-pipe.pipe';
import { AdditionalActionsDropdownComponent } from '../../../../shared/components/additional-actions-dropdown/additional-actions-dropdown.component';
import { AbsoluteOverlayComponent } from '../../../../shared/components/absolute-overlay/absolute-overlay.component';
import { ItemDetailsComponent } from '../shared/components/item-details/item-details.component';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import {FadeInWrapperComponent} from "../../../../shared/components/fade-in-wrapper/fade-in-wrapper.component";

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [
    CategoryListComponent,
    SortingDropdownComponent,
    ProviderDropdownComponent,
    FormsModule,
    CustomFilterPipe,
    AdditionalActionsDropdownComponent,
    AbsoluteOverlayComponent,
    ItemDetailsComponent,
    ClickOutsideDirective,
    PortalModule,
    FadeInWrapperComponent
  ],
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
})
export class BuyComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(CdkPortal) portal!: CdkPortal;

  selectedCategory: string = null;
  selectedItems: Item[] = [];
  order: string = null;
  provider: string = null;
  private subscriptions: Subscription = new Subscription();
  searchText: any;




  constructor(private marketService: MarketService, private overlay: Overlay) {}

  ngOnInit() {
    const categorySubscription = this.marketService.selectedCategorySubject.subscribe((selectedCategory: string) => {
      this.selectedCategory = selectedCategory;
      this.filterAndSortItems();
    });

    const sortingSubscription = this.marketService.selectedSortingSubject.subscribe((selectedSorting: string) => {
      this.order = selectedSorting;
      this.filterAndSortItems();
    });

    const providerSubscription = this.marketService.selectedProviderSubject.subscribe(provider => {
      this.provider = provider;
      this.filterAndSortItems();
    });

    this.subscriptions.add(categorySubscription);
    this.subscriptions.add(sortingSubscription);
    this.subscriptions.add(providerSubscription);
  }

  ngAfterViewInit() {
    const config = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    });
    const overlayRef = this.overlay.create(config);
    overlayRef.attach(this.portal);
  }

  private filterAndSortItems() {
    this.selectedItems = this.marketService.filterAndSortItems(this.selectedCategory, this.order, 'buy', this.provider);
  }

  get detailsStatus() {
    return this.marketService.openDetailsSubject.getValue();
  }

  getItemsWithSorting(): Item[] {
    return this.selectedItems;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
