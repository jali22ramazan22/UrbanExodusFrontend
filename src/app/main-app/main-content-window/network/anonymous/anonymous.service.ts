import {Injectable, OnInit} from "@angular/core";
import {NetworkService} from "../network.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Message} from "./models/message";


@Injectable({
  providedIn: 'root'
})
export class AnonymousService{
  loadedChatContent: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(null);
  selectedChat: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor(private networkService: NetworkService) {
  }



  //hardcoding
  getChat(selectedChat: string): Message[] {
      if(!selectedChat){
        return null;
      }
      if(selectedChat === 'FFD2012'){
        return [
          new Message('FFD2012', 'ПРИВЕТ', new Date(2024, 5, 12, 15, 30)),
          new Message('USER', 'НУ ПРИВЕТ БАТЯ', new Date(2024, 5, 12, 15, 31))
        ]
      }

      return [
        new Message('SAMSON', 'ПРИВЕТ', new Date(2024, 5, 11, 14, 30)),
        new Message('User', 'НУ ПРИВЕТ БАТЯ', new Date(2024, 5, 11, 14, 30))
      ]
    }



}
