import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import { AuthService } from 'src/app/services/auth.service';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;


  constructor(
    private flashMessagesService:FlashMessagesService,
    private authService :AuthService,
    private router:Router,
    private settingService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn = true
        this.loggedInUser = auth.email;
      }else{
        this.isLoggedIn = false
      }
    })

    this.showRegister = this.settingService.getSettings().allowRegistration
  }

  onLogoutClick(){
    this.authService.logout()
    this.flashMessagesService.show("You are logged out", {
      cssClass:"alert-success", timeout:4000
    })
    this.router.navigate(["/login"])
  }

}
