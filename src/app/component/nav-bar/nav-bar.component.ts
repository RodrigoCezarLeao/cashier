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
  
  constructor(public translateService: TranslateService, private hubService: HubService){}

  refreshCashier(){
    let userAnswer = prompt(this.translateService.translate('alert_reset_all_app'))?.toLowerCase();
    if (userAnswer === 'deletar' || userAnswer === 'delete'){
      localStorage.removeItem('products-cashier');
      localStorage.removeItem('sales-cashier');
      window.location.reload();
    }
  }

  changeLanguage(lang: string){
    this.translateService.changeLanguage(lang);
    this.hubService.notify(CHANGE_LANGUAGE);
  }

}
