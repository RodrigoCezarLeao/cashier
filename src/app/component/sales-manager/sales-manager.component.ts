import { Component } from '@angular/core';
import { product } from 'src/app/interfaces/product';
import { createEmptySale, emptySale, sales } from 'src/app/interfaces/sales';
import { HubService } from 'src/app/service/hub.service';

@Component({
  selector: 'app-sales-manager',
  templateUrl: './sales-manager.component.html',
  styleUrls: ['./sales-manager.component.css']
})
export class SalesManagerComponent {
  products: product[] = [];
  cashierProducts: sales[] = [];
  totalCashier = 0;
  
  constructor(private hubService: HubService){
    this.hubService.getProducts().subscribe(products => {      
      this.products = products;
    });
  }
  
  addRecord(){
    this.cashierProducts.push(createEmptySale());
  }

  updateTotalValueRecord(idDate: string){
    let record = this.cashierProducts.find(x => x.idDate === idDate);
    if (record && record.productId){
      let product = this.products.find(x => x.id === record?.productId);
      if (product && product.price > 0)
        return (product.price * record.amount).toFixed(2);
    }

    return "";
  }

  updateTotalValueCashier(){    
    let total = 0;
    for(let record of this.cashierProducts){
      let product = this.products.find(x => x.id === record?.productId);

      if (record && record.productId && product && product.price > 0){
        total += product.price * record.amount; 
      }
    }
    this.totalCashier = total;
  }

  checkIfRecordCanBeSaved(){
    if (this.cashierProducts.length > 0 && this.totalCashier > 0)  
      return true;
    return false;
  }

  addNewSale(){
    // Aggroup duplicated products
    let agg_records: sales[] = [];
    let dateId = new Date().toISOString();
    for(let record of this.cashierProducts){
      if (!agg_records.find(x => x.productId === record.productId)){
        let productRecords = this.cashierProducts.filter(x => x.productId === record.productId);
        if (productRecords.length > 1)
          record.amount = productRecords.map(x => x.amount).reduce((a, b) => a + b, 0);
          
        record.idDate = dateId;
        agg_records.push(record);
      }
    }
    
    this.hubService.addSales(agg_records);
    alert("Venda realizada com sucesso!");

    // Reset screen
    this.cashierProducts = [];
    this.totalCashier = 0;
  }
  
}
