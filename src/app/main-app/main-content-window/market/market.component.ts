import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";
import {navbarModel, NavbarModelBuilder} from "../../../shared/models/UIModels/navbarModel";
import {NavbarLoaderService} from "../../../shared/services/navbar-loader.service";
import {MarketService} from "./market.service";
import {FadeInWrapperComponent} from "../../../shared/components/fade-in-wrapper/fade-in-wrapper.component";

@Component({
  selector: 'app-market',
  standalone: true,
  imports: [
    RouterOutlet,
    NgForOf,
    RouterLinkActive,
    RouterLink,
    FadeInWrapperComponent
  ],
  templateUrl: './market.component.html',
  styleUrl: './market.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class MarketComponent implements OnInit {
  marketNavbarItems: navbarModel[] = null;


  constructor(private navbarLoaderService: NavbarLoaderService, private marketService: MarketService) {

  }

  ngOnInit() {
    this.navbarLoaderService.buildNavbarArray('market', "common-navbar")
      .subscribe(navbar => this.marketNavbarItems = navbar
    );

  }


}
