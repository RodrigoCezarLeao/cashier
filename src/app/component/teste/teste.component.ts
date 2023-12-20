import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog'
import { getProducts } from 'src/app/helpers/products';
import { product } from 'src/app/interfaces/product';
import { sales } from 'src/app/interfaces/sales';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent {
  products: product[] = [];
  sales: sales[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<MatDialog>){
    this.products = getProducts();
    this.sales = this.data.chave;
  }

  formatDate(date: string){  
    let result = "";

    const cDate = new Date(date);
    const day = `${cDate.getDate().toString().padStart(2, '0')}`;
    const month = `${(cDate.getMonth() + 1).toString().padStart(2, '0')}`;
    const year = `${cDate.getFullYear().toString()}`;
    const hour = `${cDate.getHours().toString().padStart(2, '0')}`;
    const minute = `${cDate.getMinutes().toString().padStart(2, '0')}`;
    
    const fDate = `${day}/${month}/${year}`;
    result = fDate;
    
    return result;
}

formatHour(date: string){  
    let result = "";

    const cDate = new Date(date);
    const day = `${cDate.getDate().toString().padStart(2, '0')}`;
    const month = `${(cDate.getMonth() + 1).toString().padStart(2, '0')}`;
    const year = `${cDate.getFullYear().toString()}`;
    const hour = `${cDate.getHours().toString().padStart(2, '0')}`;
    const minute = `${cDate.getMinutes().toString().padStart(2, '0')}`;
    
    const fDate = `${hour}:${minute}`;
    result = fDate;
    
    return result;
}

getProductName(product_id: number){
  return this.products.find(x => x.id === Number(product_id))?.name;
}

getProductValue(product_id: number){
  return this.products.find(x => x.id === Number(product_id))?.price;
}

getFormatedProductValue(product_id: number){
  return `${this.products.find(x => x.id === Number(product_id))?.price.toFixed(2)}`;
}

sumTotalCashier(sales: sales[]){
  let total = 0;

  for(let s of sales){

    total += s.amount * (this.getProductValue(s.product_id) ?? 0);
  }

  return total.toFixed(2);
}

  close(){
    this.dialogRef.close()
  }
}
