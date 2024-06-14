import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SearchBarComponent} from "./shared/search-bar/search-bar.component";
import {FadeInWrapperComponent} from "../../../shared/components/fade-in-wrapper/fade-in-wrapper.component";

@Component({
  selector: 'app-network',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchBarComponent,
    FadeInWrapperComponent
  ],
  templateUrl: './network.component.html',
  styleUrl: './network.component.css',
})
export class NetworkComponent {

}
