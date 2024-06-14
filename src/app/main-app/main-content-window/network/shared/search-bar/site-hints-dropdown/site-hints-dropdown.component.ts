import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {NetworkService} from "../../../network.service";
import {NavbarLoaderService} from "../../../../../../shared/services/navbar-loader.service";
import {navbarModel} from "../../../../../../shared/models/UIModels/navbarModel";
import {CustomFilterPipe} from "../../../../../../shared/pipes/search-filter-pipe.pipe";
import {levenshtein} from "../../../../../../shared/functions/levenstein";

@Component({
  selector: 'app-site-hints-dropdown',
  standalone: true,
  imports: [
    CustomFilterPipe
  ],
  templateUrl: './site-hints-dropdown.component.html',
  styleUrl: './site-hints-dropdown.component.css'
})
export class SiteHintsDropdownComponent implements OnInit{
  hintsItems: navbarModel[] = []
  @Output() siteSelectedFromHints = new EventEmitter<string>();
  @Input() searchText?: string;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.code == 'ArrowRight'){

    }
  }


  //the basic sites will be uploaded from client... cashing with sqlite the researched sites????
  constructor(
    private networkService: NetworkService,
    private navbarLoaderService: NavbarLoaderService ) {} //temporarily


  ngOnInit(){
    this.navbarLoaderService.buildNavbarArray('network', 'network-sites')
      .subscribe(navbar => this.hintsItems = navbar);
  }


  onSelectSite(value: any) {
    this.siteSelectedFromHints.emit(value);
  }
}
