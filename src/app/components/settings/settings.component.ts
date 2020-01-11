import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import { SettingsService } from 'src/app/services/settings.service';
import {Settings} from "../../models/Settings"

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings:Settings;

  constructor(
    private flashMessagesService:FlashMessagesService,
    private router:Router,
    private settingService: SettingsService
  ) { }

  ngOnInit() {
    this.settings = this.settingService.getSettings()
  }

  onSubmit(){
    this.settingService.changeSettings(this.settings)
    this.flashMessagesService.show("Settings Saved", {
      cssClass:"alert-success", timeout: 3000
    })
  }

}
