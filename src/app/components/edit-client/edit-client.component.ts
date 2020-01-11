import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../services/client.service";
import {Client} from "../../models/Client";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {SettingsService} from "../../services/settings.service"

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  client:Client ={
    id:"",
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    balance:0
  }
  disableBalanceOnEdit: boolean;

  constructor
  (private flashMessagesService:FlashMessagesService,
    private clientService :ClientService,
    private router:Router,
    private settingService : SettingsService,
    private route:ActivatedRoute,) { }

  ngOnInit() {
    this.disableBalanceOnEdit  = this.settingService.getSettings().disableBalanceOnEdit;

    this.id = this.route.snapshot.params["id"];

    this.clientService.getClient(this.id).subscribe(client=>{
      this.client = client
    });
  }

  onSubmit({value,valid}: {value:Client, valid:boolean}){
    if(!valid){
      this.flashMessagesService.show("Please fill out the form correctly",{
        cssClass:"alert-danger", timeout: 4000
      })
    }else{

      value.id = this.id
      this.clientService.updateClient(value)
      this.flashMessagesService.show("Client Updated",{
        cssClass:"alert-success", timeout: 4000
      })
      this.router.navigate(["/client/"+this.id])
    }

  }



}
