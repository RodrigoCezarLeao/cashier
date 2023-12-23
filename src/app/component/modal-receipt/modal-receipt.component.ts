import { Component, ElementRef, Input } from '@angular/core';
import { product } from 'src/app/interfaces/product';
import { emptySale, sales } from 'src/app/interfaces/sales';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import { formatDate, formatHour } from 'src/app/helpers/general';
import { HubService } from 'src/app/service/hub.service';
import { getProductName, getProductPrice } from 'src/app/helpers/products';

@Component({
  selector: 'app-modal-receipt',
  templateUrl: './modal-receipt.component.html',
  styleUrls: ['./modal-receipt.component.css']
})
export class ModalReceiptComponent {

  @Input() sales: sales[] = [];
  products: product[] = [];  
  
  constructor(private hubService: HubService){
    this.hubService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  
  formatHour(arg0: string) {
    return formatHour(arg0);
  }
  formatDate(arg0: string) {
    return formatDate(arg0);
  }

  getProductName(prodId: string){
    return getProductName(prodId, this.products);
  }
  getProductPrice(prodId: string){
    return getProductPrice(prodId, this.products)?.toFixed(2);
  }

  getProductTotalPrice(prodId: string, amount: number){
    return ((getProductPrice(prodId, this.products) ?? 0) * amount).toFixed(2);
  }

  getTotalSaleValue(){
    let total = 0;
    for(let sale of this.sales){
      total += (getProductPrice(sale.productId, this.products) ?? 0) * sale.amount;
    }
    return total.toFixed(2);
  }

  deleteSales(){
    if(prompt(`Para deletar a venda feita em '${this.sales[0].idDate}' de valor total = R\$${this.getTotalSaleValue()}, digite 'deletar'`) === 'deletar'){
      this.hubService.deleteSales(this.sales);
      this.hubService.notifyArgs('sales_event', this.sales);
    }
  }

}
