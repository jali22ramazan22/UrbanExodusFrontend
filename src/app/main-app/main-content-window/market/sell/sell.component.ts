import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {MarketService} from "../market.service";
import {CategoryListComponent} from "../shared/components/category-list/category-list.component";
import {SortingDropdownComponent} from "../shared/components/sorting-dropdown/sorting-dropdown.component";
import {ProviderDropdownComponent} from "../shared/components/provider-dropdown/provider-dropdown.component";
import {Item} from "../../../../shared/models/itemsModels/item.model";
import {filter, Subscription} from "rxjs";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomFilterPipe} from "../../../../shared/pipes/search-filter-pipe.pipe";
import {
  AdditionalActionsDropdownComponent
} from "../../../../shared/components/additional-actions-dropdown/additional-actions-dropdown.component";

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [
    CategoryListComponent,
    SortingDropdownComponent,
    ProviderDropdownComponent,
    ReactiveFormsModule,
    FormsModule,
    CustomFilterPipe,
    AdditionalActionsDropdownComponent
  ],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SellComponent implements OnInit, OnDestroy {
  selectedCategory: string = null;
  selectedItems: Item[] = [];
  order: string = null;
  private subscriptions: Subscription = new Subscription();
  searchText: any;

  constructor(private marketService: MarketService) {}

  ngOnInit() {
    const categorySubscription = this.marketService.selectedCategorySubject
      .subscribe((selectedCategory: string) => {
        this.selectedCategory = selectedCategory;
        this.filterAndSortItems();
      })
    const sortingSubscription = this.marketService.selectedSortingSubject.subscribe((selectedSorting: string) => {
      this.order = selectedSorting;
      this.filterAndSortItems();
    });
  }


  private filterAndSortItems(){
    this.selectedItems = this.marketService.filterAndSortItems(this.selectedCategory, this.order, 'sell');
  }

  getItemsWithSorting(){
    return this.selectedItems;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
