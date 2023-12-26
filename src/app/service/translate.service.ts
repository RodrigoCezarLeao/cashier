import { Injectable } from '@angular/core';
import { HubService } from './hub.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  language: string;
  
  constructor(private hubService: HubService) {
    this.language = this.getCachedLanguage() ?? 'pt-br';
   }

  getCachedLanguage(){
    return localStorage.getItem('cashier-language');
  }

  setCacheLanguage(lang: string){
    localStorage.setItem('cashier-language', lang);
  }

 translate(key: string){  
    return this.intl[key][this.language];
  }
  
  translateWithParams(key:string, args: string[]){
    let text = this.translate(key);
    for(let elem of args){
      text = text.replace('@var', elem);
    }
    return text;
  }

  changeLanguage(language: string){
    this.setCacheLanguage(language);
    this.language = language;
  }

  intl: Record<string, Record<string, string>> = {
    "nav_bar_sales": {
      "pt-br": "Vendas",
      "en-us": "Sales",
    },
    "nav_bar_products": {
      "pt-br": "Produtos",
      "en-us": "Products",
    },
    "nav_bar_cashier": {
      "pt-br": "Caixa",
      "en-us": "Cashier",
    },
    "nav_bar_reset": {
      "pt-br": "Resetar",
      "en-us": "Reset",
    },
    "products-manager-add-products": {
      "pt-br": "Adicionar Produto",
      "en-us": "Add Product",
    },
    "products-manager-table-description": {
      "pt-br": "Descrição",
      "en-us": "Description",
    },
    "products-manager-table-value": {
      "pt-br": "Valor",
      "en-us": "Value",
    },
    "products-manager-button-update": {
      "pt-br": "Atualizar",
      "en-us": "Update",
    },
    "sale-receipt-table-amount": {
      "pt-br": "Qtd",
      "en-us": "Amount",
    },
    "sale-receipt-table-product": {
      "pt-br": "Produto",
      "en-us": "Product",
    },
    "sale-receipt-table-price": {
      "pt-br": "Preço Unit.",
      "en-us": "Unit Price",
    },
    "sale-receipt-table-price-only": {
      "pt-br": "Preço",
      "en-us": "Price",
    },
    "sale-receipt-table-total": {
      "pt-br": "Total",
      "en-us": "Total",
    },
    "sale-receipt-button-delete": {
      "pt-br": "Deletar",
      "en-us": "Delete",
    },
    "sales-list-total-sales": {
      "pt-br": "Total Venda: R$",
      "en-us": "Final Value: $",
    },
    "sales-manager-add-record": {
      "pt-br": "Adicionar Registro",
      "en-us": "Add Record",
    },
    "sales-manager-total-value": {
      "pt-br": "Total R$: ",
      "en-us": "Total $:",
    },
    "sales-manager-sale-concluded": {
      "pt-br": "Venda realizada com sucesso!",
      "en-us": "Sale concluded successfully!",
    },
    "sales-manager-save-record": {
      "pt-br": "Registrar Venda",
      "en-us": "Save Sale Record",
    },
    "alert-products-updated": {
      "pt-br": "Produtos atualizados com sucesso!",
      "en-us": "Products updated successfully!",
    },
    "alert-product-already-selled": {
      "pt-br": "Não é possível deletar o produto pois já existe uma venda feita com ele. Exclua todas as vendas desse produto para depois deletá-lo.",
      "en-us": "Product can not be deleted since there is at least one sale concluded with it. Please, delete all sales with this product to be able to delete it.",
    },
    "alert-product-confirm-product-delete": {
      "pt-br": "Para deletar o produto '@var', digite 'deletar'.",
      "en-us": "To delete product '@var', type 'delete'.",
    },
    "alert-sale-confirm-delete": {
      "pt-br": "Para deletar a venda feita em '@var' de valor total = R$@var, digite 'deletar'.",
      "en-us": "To delete sale concluded in '@var' with total price = $@var, type 'delete'.",
    },
    "alert_reset_all_app": {
      "pt-br": "Digite 'deletar' para excluir todos os registros do site.",
      "en-us": "To delete all records, type 'delete'.",
    },
    "": {
      "pt-br": "",
      "en-us": "",
    },
  };
}
