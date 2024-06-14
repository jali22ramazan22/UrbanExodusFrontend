import { Component, OnInit } from '@angular/core';
import {QuestListComponent} from "./quest-list/quest-list.component";
import {QuestDetailsComponent} from "./quest-details/quest-details.component";



@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  standalone: true,
  imports: [
    QuestListComponent,
    QuestDetailsComponent,
  ],
  styleUrls: ['./quests.component.css']
})
export class QuestsComponent implements OnInit{

  constructor() {
  }

  ngOnInit(): void {

  }
}
