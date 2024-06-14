import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Message} from "../models/message";
import {AnonymousService} from "../anonymous.service";
import {PublishedTimePipe} from "../../../../../shared/pipes/published-time.pipe";
import {AsyncPipe} from "@angular/common";
import {Subscription} from "rxjs";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-anonymous-chat',
  standalone: true,
  imports: [
    PublishedTimePipe,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './anonymous-chat.component.html',
  styleUrl: './anonymous-chat.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AnonymousChatComponent implements OnInit, OnDestroy{
  loadedChatContent: Message[] = [];
  loadedChatSubscription = new Subscription()

  constructor(private anonymousService: AnonymousService) {
  }




  ngOnInit() {
    this.loadedChatSubscription = this.anonymousService.loadedChatContent
      .subscribe(loadedChatContent => this.loadedChatContent = loadedChatContent);
  }
  ngOnDestroy() {
    this.loadedChatSubscription.unsubscribe();
  }

}
