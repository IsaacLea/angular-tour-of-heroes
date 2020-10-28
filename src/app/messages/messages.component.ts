import { MessageService } from './../message.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // MessageService must be public to bind to the template/html
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
