import {
  Component,
  ElementRef, HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomFilterPipe } from "../../../../../shared/pipes/search-filter-pipe.pipe";
import { navbarModel } from "../../../../../shared/models/UIModels/navbarModel";
import { NavbarLoaderService } from "../../../../../shared/services/navbar-loader.service";
import { Subscription } from "rxjs";
import {levenshtein} from "../../../../../shared/functions/levenstein";
import {SiteHintsDropdownComponent} from "./site-hints-dropdown/site-hints-dropdown.component";
import {ClickOutsideDirective} from "../../../../../shared/directives/click-outside.directive";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CustomFilterPipe, ReactiveFormsModule, SiteHintsDropdownComponent, ClickOutsideDirective],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit, OnDestroy{
  @ViewChild('input') input: ElementRef;



  startedTyping = false;
  searchBarSubscription: Subscription;
  searchBarItems: navbarModel[] = [];
  search: FormGroup;




  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navbarLoaderService: NavbarLoaderService,
  ) { }

  ngOnInit() {
    this.searchBarSubscription = this.navbarLoaderService.buildNavbarArray('network', 'network-sites')
      .subscribe(navbar => this.searchBarItems = navbar);

    this.search = new FormGroup({
      'searchBar': new FormControl(null)
    });

    this.search.valueChanges.subscribe(
      value => {
        this.startedTyping = value['searchBar'].length >= 1;
      }
    )
  }


  onNavigate(): void {
    //using the levenshtein distance to autocomplete finishing address
    const searchBarValue = this.search.value['searchBar'];
    let route = this.searchBarItems.find(item =>
      levenshtein(item.value, searchBarValue) <= 4);

    if (!route) {
      return;
    }
    this.router.navigate(route.routerLinkParams, { relativeTo: this.route }).then(r => {
      console.log("Navigation successful");
      this.startedTyping = false;
      this.search.patchValue({
        'searchBar': `${route.extraParam1}${route.value}`
      });
    });
  }

  toggleHints(){
    this.startedTyping = !this.startedTyping;
  }

  onHandleHintCompletion(value: string){
    this.search.value['searchBar'] = value;
    this.onNavigate();
    setTimeout(() => this.toggleHints(), 10);
  }


  ngOnDestroy() {
    if (this.searchBarSubscription) {
      this.searchBarSubscription.unsubscribe();
    }
  }
}
