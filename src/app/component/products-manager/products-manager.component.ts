import { Component, ElementRef, ViewChild } from '@angular/core';
import { getCachedProducts } from 'src/app/helpers/products';
import { createEmptyProduct, emptyProduct, product } from 'src/app/interfaces/product';
import { HubService } from 'src/app/service/hub.service';


@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.css']
})
export class ProductsManagerComponent {
  products: product[] = [];

  constructor(private hubService: HubService) {
    this.hubService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
  

  addProduct(){
    this.products.push(createEmptyProduct());
  }

  update(){
    this.hubService.editProducts(this.products);
    alert("Produtos atualizados com sucesso!");
  }

  checkIfUpdateIsNeeded(){
    const cachedProducts = getCachedProducts();
    
    if (this.products.length !== cachedProducts.length)
      return true;
    else {
      for(let product of this.products){
        let obs_product = cachedProducts.find((x: product) => x.id === product.id);
        if (!obs_product || product.name !== obs_product.name || product.price !== obs_product.price)
          return true;
      }

      return false;
    }    
  }

}
