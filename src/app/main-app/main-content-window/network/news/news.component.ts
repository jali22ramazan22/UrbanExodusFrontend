import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from "./news.service";
import {PublishedTimePipe} from "../../../../shared/pipes/published-time.pipe";
import {AsyncPipe} from "@angular/common";
import {
  AdditionalActionsDropdownComponent
} from "../../../../shared/components/additional-actions-dropdown/additional-actions-dropdown.component";
import {HottestNews, LocalNews} from "../../../../shared/models/networkModels/news.model";
import {Subscription} from "rxjs";
import {FadeInWrapperComponent} from "../../../../shared/components/fade-in-wrapper/fade-in-wrapper.component";

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    PublishedTimePipe,
    AsyncPipe,
    AdditionalActionsDropdownComponent,
    FadeInWrapperComponent
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit, OnDestroy{
  hottestNews: HottestNews[] = [];
  localNews: LocalNews[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private newsService: NewsService) {}


  ngOnInit(){
    const hottestSubscription = this.newsService.hottestNewsSubject
      .subscribe(news => this.hottestNews = news);
    const localSubscription = this.newsService.localNewsSubject
      .subscribe(news => this.localNews = news);

    this.subscriptions.add(hottestSubscription);
    this.subscriptions.add(localSubscription);
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  protected readonly PublishedTimePipe = PublishedTimePipe;
}
