import {Component, ViewEncapsulation} from '@angular/core';
import {MarketService} from "../../../market.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
  encapsulation: ViewEncapsulation.None
})
export class CategoryListComponent {
  constructor(private marketService: MarketService) {}

  get categories(){
    return this.marketService.marketCategoriesItems;
  }
  get selectedCategory(): string{
    return this.marketService.selectedCategorySubject.getValue();
  }
  onSelectCategory(selectedCategory: string) {
    this.marketService.selectedCategorySubject.next(selectedCategory);
  }
}
