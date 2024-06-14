import {Component, ViewEncapsulation} from '@angular/core';
import {navbarModel} from "../../../../../shared/models/UIModels/navbarModel";
import {NavbarLoaderService} from "../../../../../shared/services/navbar-loader.service";
import {AnonymousService} from "../anonymous.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-anonymous-list',
  standalone: true,
  imports: [],
  templateUrl: './anonymous-list.component.html',
  styleUrl: './anonymous-list.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AnonymousListComponent {
  anonymousChatsItems: navbarModel[] = []
  navbarSubscription = new Subscription();
  selectedChat: string = null;

  constructor(private navbarLoaderService: NavbarLoaderService,
              private anonymousService: AnonymousService) {
  }

  ngOnInit(){
     this.navbarSubscription = this.navbarLoaderService
      .buildNavbarArray('network', 'anonymous-list')
      .subscribe(navbar => this.anonymousChatsItems = navbar);
  }

  onSelectChat(selectedChat: navbarModel) {
    this.selectedChat = selectedChat.value;
    this.anonymousService.selectedChat.next(this.selectedChat);
    this.anonymousService.loadedChatContent
      .next(this.anonymousService.getChat(selectedChat.value));
  }


  ngOnDestroy(){
    this.navbarSubscription.unsubscribe();
  }
}
