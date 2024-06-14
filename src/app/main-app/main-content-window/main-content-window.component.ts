import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd, NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { AbsoluteOverlayComponent } from "../../shared/components/absolute-overlay/absolute-overlay.component";
import { ItemDetailsComponent } from "./market/shared/components/item-details/item-details.component";
import {FadeInWrapperComponent} from "../../shared/components/fade-in-wrapper/fade-in-wrapper.component";
import {Subscription} from "rxjs";
import {LoadingScreenComponent} from "../../shared/components/loading-screen/loading-screen.component";

declare type Event_2 = NavigationStart | NavigationEnd | NavigationCancel
export { Event_2 as Event }


@Component({
  selector: 'app-main-content-window',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    AbsoluteOverlayComponent,
    ItemDetailsComponent,
    FadeInWrapperComponent,
    LoadingScreenComponent,
  ],
  templateUrl: './main-content-window.component.html',
  styleUrls: ['./main-content-window.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MainContentWindowComponent{


}
