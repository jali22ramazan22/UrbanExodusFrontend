import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Item} from "../../../../../../shared/models/itemsModels/item.model";
import {MarketService} from "../../../market.service";
import {Subscription} from "rxjs";
import {LevelColorDirective} from "../../../../../../shared/directives/levelColor.directive";

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [
    LevelColorDirective
  ],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit, OnDestroy{

  ItemSubscription: Subscription;
  selectedItem: Item;
  constructor(private marketService: MarketService) {
  }

  ngOnInit(){
    this.ItemSubscription = this.marketService.openDetailsSubject.subscribe(
      item => this.selectedItem = item
    )
  }

  onClose(){
    this.marketService.openDetailsSubject.next(null);
  }

  ngOnDestroy() {
    this.ItemSubscription.unsubscribe();
  }
}
