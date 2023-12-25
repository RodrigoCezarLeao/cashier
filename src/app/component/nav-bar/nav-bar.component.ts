import { Component } from '@angular/core';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  
  constructor(public translateService: TranslateService){}

}
