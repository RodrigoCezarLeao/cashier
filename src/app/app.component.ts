import { Component } from '@angular/core';
import { TranslateService } from './service/translate.service';
import { Title } from '@angular/platform-browser';
import { HubService } from './service/hub.service';
import { CHANGE_LANGUAGE } from './events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Title - angular service for title
  constructor(public translateService: TranslateService, private titleService: Title, private hubService: HubService){
    titleService.setTitle(translateService.translate('title'));
    hubService.subscribe(CHANGE_LANGUAGE, () => titleService.setTitle(translateService.translate('title')));
  }

  deleteAll(){
    if (confirm("Deseja excluir todos os registros?")){
      window.localStorage.removeItem('products');
      window.localStorage.removeItem('sales');
      location.reload();
    }
  }
}
