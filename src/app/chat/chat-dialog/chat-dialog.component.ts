import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/scan';


@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit, AfterViewChecked {

  messages: Observable<Message[]>;
  formValue: string;
  numberA:any;
  numberB:any;
  numberC:any;
  numberD:any;
  numberE:any;
  score:any;
  ifReady=0;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  constructor(public chat: ChatService) { }

  ngOnInit() {
    this.numberA=0;
    this.numberB=0;
    this.numberC=0;
    this.numberD=0;
    this.numberE=0;
    this.score=0;
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
      .scan((acc, val) => acc.concat(val));
    this.scrollToBottom();
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
    this.score=(this.numberA*1+this.numberB*2+this.numberC*3+this.numberD*4+this.numberE*5)/16;
    if((this.numberA+this.numberB+this.numberC+this.numberD+this.numberE)==16){
      this.sendLastMessage();
    }
    console.log(this.score)
    let messageReceived=this.messages['source']['source']['value']['0']['content'];
    if(messageReceived=='Oui' || messageReceived=='oui' || messageReceived=='ui' || messageReceived=='wi'){
      this.ifReady=1;
    }
  }
  
  sendLastMessage(){
    this.chat.sendLastMessage(this.score);
  }
  sendMessageA() {
    this.chat.converse('A');
    this.numberA++;
    this.score=(this.numberA*1+this.numberB*2+this.numberC*3+this.numberD*4+this.numberE*5)/16;
    if((this.numberA+this.numberB+this.numberC+this.numberD+this.numberE)==16){
      this.sendLastMessage();
    }
    console.log(this.score)
  }
  sendMessageB() {
    this.chat.converse('B');
    this.numberB++;
    this.score=(this.numberA*1+this.numberB*2+this.numberC*3+this.numberD*4+this.numberE*5)/16;
    if((this.numberA+this.numberB+this.numberC+this.numberD+this.numberE)==16){
      this.sendLastMessage();
    }
    console.log(this.score)
  }
  sendMessageC() {
    this.chat.converse('C');
    this.numberC++;
    this.score=(this.numberA*1+this.numberB*2+this.numberC*3+this.numberD*4+this.numberE*5)/16;
    if((this.numberA+this.numberB+this.numberC+this.numberD+this.numberE)==16){
      this.sendLastMessage();
    }
    console.log(this.score)
  }
  sendMessageD() {
    this.chat.converse('D');
    this.numberD++;
    this.score=(this.numberA*1+this.numberB*2+this.numberC*3+this.numberD*4+this.numberE*5)/16;
    if((this.numberA+this.numberB+this.numberC+this.numberD+this.numberE)==16){
      this.sendLastMessage();
    }
    console.log(this.score)
  }
  sendMessageE() {
    this.chat.converse('E');
    this.numberE++;
    this.score=(this.numberA*1+this.numberB*2+this.numberC*3+this.numberD*4+this.numberE*5)/16;
    if((this.numberA+this.numberB+this.numberC+this.numberD+this.numberE)==16){
      this.sendLastMessage();
    }
    console.log(this.score)
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
