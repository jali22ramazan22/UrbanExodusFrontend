import {Component, OnInit} from '@angular/core';
import {navbarModel} from "../../../shared/models/UIModels/navbarModel";
import {NgForOf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NavbarLoaderService} from "../../../shared/services/navbar-loader.service";
import {FadeInWrapperComponent} from "../../../shared/components/fade-in-wrapper/fade-in-wrapper.component";

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    FadeInWrapperComponent
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css',
})
export class PersonalComponent implements OnInit{

  personalNavbarItems: navbarModel[];
  constructor(private navbarLoaderService: NavbarLoaderService) {}

  ngOnInit() {
    this.navbarLoaderService.buildNavbarArray('personal').subscribe(
      (navbar) => this.personalNavbarItems = navbar
    )
  }



}
