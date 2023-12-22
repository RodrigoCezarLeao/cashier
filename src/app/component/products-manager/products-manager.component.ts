import { Component, ElementRef, ViewChild } from '@angular/core';
import { createEmptyProduct, emptyProduct, product } from 'src/app/interfaces/product';
import { HubService } from 'src/app/service/hub.service';


@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.css']
})
export class ProductsManagerComponent {
  products: product[] = [];
  products_observer: product[] = [];


  constructor(private hubService: HubService) {
    this.hubService.getProducts().subscribe(products => {    
      this.products_observer = products;
    });

    this.products = [...this.products_observer];
  }
  

  addProduct(){
    this.products.push(createEmptyProduct());
  }

  update(){
    this.hubService.editProducts(this.products);
    this.products_observer = [...this.products];
    alert("Produtos atualizados com sucesso!");
  }

  checkIfUpdateIsNeeded(){
    console.log("🚀 ~ file: products-manager.component.ts:13 ~ ProductsManagerComponent ~ products:", this.products)
  console.log("🚀 ~ file: products-manager.component.ts:15 ~ ProductsManagerComponent ~ products_observer:", this.products_observer)
    if (this.products.length !== this.products_observer.length)
      return true;
    else {
      for(let product of this.products){
        let obs_product = this.products_observer.find(x => x.id === product.id);
        if (!obs_product || product.name !== obs_product.name || product.price !== obs_product.price)
          return true;
      }

      return false;
    }    
  }

}
