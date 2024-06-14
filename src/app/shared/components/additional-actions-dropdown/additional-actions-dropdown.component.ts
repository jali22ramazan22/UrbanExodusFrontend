import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {navbarModel} from "../../models/UIModels/navbarModel";
import {NavbarLoaderService} from "../../services/navbar-loader.service";
import {Subscription} from "rxjs";
import {MarketService} from "../../../main-app/main-content-window/market/market.service";
import {Item} from "../../models/itemsModels/item.model";
import {ClickOutsideDirective} from "../../directives/click-outside.directive";

@Component({
  selector: 'app-additional-actions-dropdown',
  standalone: true,
  imports: [
    ClickOutsideDirective
  ],
  templateUrl: './additional-actions-dropdown.component.html',
  styleUrl: './additional-actions-dropdown.component.css'
})
export class AdditionalActionsDropdownComponent implements OnInit, OnDestroy {
  @Input() item?: Item;
  @Input() additionalActionsListParams: string[];
  @Input() imageWidth?: number = 2;
  additionalActionsItems: navbarModel[] = [];
  navbarSubscription: Subscription;
  isMenuOpened = false;


  constructor(
    private navbarLoaderService: NavbarLoaderService,
    private marketService: MarketService,
    private renderer: Renderer2,
    private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('img'), 'width', `${this.imageWidth}vw`);
    if(!this.additionalActionsListParams){
      throw new Error("Select the params to load the list of dropdown");
    }
    this.navbarSubscription = this.navbarLoaderService.buildNavbarArray(this.additionalActionsListParams[0], this.additionalActionsListParams[1])
      .subscribe(navbar => this.additionalActionsItems = navbar);
  }

  onToggleCondition(){
    this.isMenuOpened = !this.isMenuOpened;
  }
  ngOnDestroy() {
    this.navbarSubscription.unsubscribe();
  }

  onSelectAction(value: string) {
    switch(value){
      case 'Подробнее':
       this.marketService.openDetailsSubject.next(this.item);
       break;
      default:
        break;
    }
    this.onToggleCondition();

  }

  onHandleClickOutside() {
    this.isMenuOpened = false;
  }
}
