import { Component, OnInit, ViewChild } from '@angular/core';
import {Client} from "../../models/Client";
import { FlashMessagesService } from 'angular2-flash-messages';
import {ClientService} from "../../services/client.service"
import {Router} from "@angular/router"
import {SettingsService} from "../../services/settings.service"

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    id:"",
    firstName:"",
    lastName: "",
    email:"",
    phone: "",
    balance: 0
  }

  disableBalanceOnAdd:boolean ;
  @ViewChild("clientForm", { static: false }) form: any
  constructor(
    private flashMessagesService:FlashMessagesService,
    private clientService :ClientService,
    private router:Router,
    private settingServices: SettingsService
    ) { }

  ngOnInit() {

    this.disableBalanceOnAdd = this.settingServices.getSettings().disableBalanceOnAdd
  }

  onSubmit({value, valid}: {value:Client, valid:boolean}){
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }

    if(!valid){
      this.flashMessagesService.show("Please enter valid answers.", {
        cssClass: "alert-danger", timeout:5000
      })
    }else{
      this.clientService.newClient(value);

      this.flashMessagesService.show("New client added", {
        cssClass: "alert-success", timeout:4000
      })

      this.router.navigate(["/"])
    }
  }

}
