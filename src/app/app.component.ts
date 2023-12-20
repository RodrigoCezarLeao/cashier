import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cashier';

  deleteAll(){
    if (confirm("Deseja excluir todos os registros?")){
      window.localStorage.removeItem('products');
      window.localStorage.removeItem('sales');
      location.reload();
    }
  }
}
