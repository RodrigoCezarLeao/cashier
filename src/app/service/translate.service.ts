import { Injectable } from '@angular/core';
import { CHANGE_LANGUAGE } from '../events';
import { HubService } from './hub.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  language: string = "pt-br";
  
  constructor(private hubService: HubService) { }

 translate(key: string){  
    return this.intl[key][this.language];
  }
  

  changeLanguage(language: string){
    this.language = language;
  }

  intl: Record<string, Record<string, string>> = {
    "nav_bar_sales": {
      "pt-br": "Vendas",
      "en-us": "Sales",
    },
    "nav_bar_products": {
      "pt-br": "Produtos",
      "en-us": "Products",
    },
    "nav_bar_cashier": {
      "pt-br": "Caixa",
      "en-us": "Cashier",
    },
    "": {
      "pt-br": "",
      "en-us": "",
    },
  };
}
