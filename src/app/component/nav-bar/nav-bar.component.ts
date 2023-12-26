import { Component } from '@angular/core';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  
  constructor(public translateService: TranslateService){}

  refreshCashier(){
    let userAnswer = prompt(this.translateService.translate('alert_reset_all_app'))?.toLowerCase();
    if (userAnswer === 'deletar' || userAnswer === 'delete'){
      localStorage.removeItem('products-cashier');
      localStorage.removeItem('sales-cashier');
      window.location.reload();
    }
  }

}
