import { Component } from '@angular/core';
import { CHANGE_LANGUAGE } from 'src/app/events';
import { HubService } from 'src/app/service/hub.service';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  
  constructor(private translateService: TranslateService){}

  translate(key: string){
    return this.translateService.translate(key)
  }
  changeLanguage(lang: string){
    this.translateService.changeLanguage(lang);
  }

}
