import { Component, ElementRef, Input } from '@angular/core';
import { product } from 'src/app/interfaces/product';
import { sales } from 'src/app/interfaces/sales';
import { formatDate, formatHour, formatTimestamp } from 'src/app/helpers/general';
import { HubService } from 'src/app/service/hub.service';
import { getProductName, getProductPrice } from 'src/app/helpers/products';
import { ProductService } from 'src/app/service/product.service';
import { SaleService } from 'src/app/service/sale.service';
import { ADD_SALE_EVENT } from 'src/app/events';
import { TranslateService } from 'src/app/service/translate.service';

@Component({
  selector: 'app-sale-receipt',
  templateUrl: './sale-receipt.component.html',
  styleUrls: ['./sale-receipt.component.css']
})
export class SaleReceiptComponent {

  @Input() sales: sales[] = [];
  products: product[] = [];  
  
  constructor(private hubService: HubService, private productService: ProductService, private saleService: SaleService, public translateService: TranslateService){
    this.products = this.productService.getProducts();
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
    let userAnswer = prompt(this.translateService.translateWithParams('alert-sale-confirm-delete', [formatTimestamp(this.sales[0].idDate), this.getTotalSaleValue()]));
    if( userAnswer === 'deletar' || userAnswer === 'delete'){
      this.saleService.deleteSales(this.sales);
      this.hubService.notifyArgs(ADD_SALE_EVENT, this.sales);
    }
  }

}
