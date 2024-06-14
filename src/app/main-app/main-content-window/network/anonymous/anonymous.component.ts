import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AnonymousListComponent} from "./anonymous-list/anonymous-list.component";
import {AnonymousChatComponent} from "./anonymous-chat/anonymous-chat.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AnonymousService} from "./anonymous.service";
import {FadeInWrapperComponent} from "../../../../shared/components/fade-in-wrapper/fade-in-wrapper.component";

@Component({
  selector: 'app-anonymous',
  standalone: true,
  imports: [
    AnonymousListComponent,
    AnonymousChatComponent,
    FormsModule,
    ReactiveFormsModule,
    FadeInWrapperComponent
  ],
  templateUrl: './anonymous.component.html',
  styleUrl: './anonymous.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AnonymousComponent implements OnInit{
  messageInput: FormGroup;
  selectedChat: string = null;
  constructor(private anonymousService: AnonymousService) {

  }

 ngOnInit(){
    this.anonymousService.selectedChat
      .subscribe(chat => {this.selectedChat = chat})
    this.messageInput = new FormGroup({
      'messageInput': new FormControl('')
    })

    this.messageInput.valueChanges.subscribe()
 }





  onSendMessage() {
    alert(this.messageInput.value['messageInput']);
  }
}
