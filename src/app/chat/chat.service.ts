import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { ApiAiClient } from 'api-ai-javascript';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string) { }
}

@Injectable()
export class ChatService {

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: 'c5b57c806a5e436c8b16b49d610175e7' });

  conversation = new BehaviorSubject<Message[]>([]);

  constructor() { }

  // Sends and receives messages via DialogFlow
  converse(msg: string) {
    const userMessage = new Message(msg, 'user');
    this.update(userMessage);

    return this.client.textRequest(msg)
      .then(res => {
        const speech = res.result.fulfillment.speech;
        const botMessage = new Message(speech, 'bot');
        this.update(botMessage);
      });
  }
  sendLastMessage(score){
    let speech="";
    if(score<3.4){
     speech="Ne vous inquiétez pas pour votre proche. Si le problème persiste je vous invite à refaire le test ou bien consulter un professionnel de santé. Merci de bien considérer que je ne pose pas un diagnostic.";
    }
    else{
       speech="Il semble que votre proche présente quelques problèmes de mémoire. Ne vous inquiétez pas. Je vous conseille de se rendre auprès d'un neurologue avec votre proche. Il pourra le bien le vérifier et le prendre en charge. Merci de bien considérer que je ne pose pas un diagnostic.";
    }
    const botMessage = new Message(speech, 'bot');
    this.update(botMessage);
  }

  // Adds message to source
  update(msg: Message) {
    this.conversation.next([msg]);
  }

}
