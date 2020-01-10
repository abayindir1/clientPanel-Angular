import { Injectable } from '@angular/core';
import {Settings} from "../models/Settings"
import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
settings: Settings = {
  allowRegistration: true,
  disableBalanceOnAdd:false,
  disableBalanceOnEdit:false
}
  constructor() { }


  getSettings():Settings{
    return this.settings
  }
}
