import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { product } from 'src/app/interfaces/product';
import { sales } from 'src/app/interfaces/sales';
import { HubService } from 'src/app/service/hub.service';
import { getProductPrice } from 'src/app/helpers/products';
import { ProductService } from 'src/app/service/product.service';
import { SaleService } from 'src/app/service/sale.service';
import { ADD_SALE_EVENT } from 'src/app/events';
import { TranslateService } from 'src/app/service/translate.service';



 
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
  
  constructor(public dialog: MatDialog, private hubService: HubService, private productService: ProductService, private saleService: SaleService, public translateService: TranslateService) {
    this.salesList = saleService.getSales();
    this.products = productService.getProducts();
    this.aggroupSalesList();

    this.hubService.subscribe(ADD_SALE_EVENT, (args: any) => {
      this.salesList = this.salesList.filter(x => x.idDate !== args?.[0]?.idDate);
      this.aggroupSalesList();
    });
  }

  aggroupSalesList(){
    if (this.salesList){
      let dateIds = Array.from(new Set(this.salesList.map(x => x.idDate))).sort().reverse();
      let aux = [];
  
      for(let dateId of dateIds){
        const salesInDateId = this.salesList.filter(x => x.idDate === dateId);
        if (salesInDateId.length > 0)
          aux.push(salesInDateId);
      }
  
      this.salesListAggrouped = aux;
      
      let total = 0;
      for(let sale of this.salesList){
        total += (getProductPrice(sale.productId, this.products) ?? 0) * sale.amount;
      }
      this.totalCashierDay = total.toFixed(2);    
    }
  }


}
