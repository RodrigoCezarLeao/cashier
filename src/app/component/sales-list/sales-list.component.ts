import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { product } from 'src/app/interfaces/product';
import { sales } from 'src/app/interfaces/sales';
import { ModalReceiptComponent } from '../modal-receipt/modal-receipt.component';
import { HubService } from 'src/app/service/hub.service';
import { getProductPrice } from 'src/app/helpers/products';



 
@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css']
})
export class SalesListComponent {
  salesList: sales[] = [];
  salesListAggrouped: sales[][] = [];
  totalCashierDay = "";
  products: product[] = [];
  
  constructor(public dialog: MatDialog, private hubService: HubService) {
    this.hubService.getSales().subscribe(sales => {      
      this.salesList = sales;
    });
    this.hubService.getProducts().subscribe(products => {
      this.products = products;
    });

    this.aggroupSalesList();
  }

  aggroupSalesList(){
    if (this.salesList){

      // TO-DO: erro quando lista vazia
      let dateIds = Array.from(new Set(this.salesList.map(x => x.idDate))).sort().reverse();
      let aux = [];
  
      for(let dateId of dateIds){
        const salesInDateId = this.salesList.filter(x => x.idDate === dateId);
        if (salesInDateId.length > 0)
          aux.push(salesInDateId);
      }
  
      this.salesListAggrouped = aux;
  
      //getTotalSaleValue()
      let total = 0;
      for(let sale of this.salesList){
        total += (getProductPrice(sale.productId, this.products) ?? 0) * sale.amount;
      }
      this.totalCashierDay = total.toFixed(2);    
    }
  }


}
