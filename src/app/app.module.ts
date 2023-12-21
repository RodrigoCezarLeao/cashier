import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsManagerComponent } from './component/products-manager/products-manager.component';
import { FormsModule } from '@angular/forms';
import { SalesManagerComponent } from './component/sales-manager/sales-manager.component';
import { SalesListComponent } from './component/sales-list/sales-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalReceiptComponent } from './component/modal-receipt/modal-receipt.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsManagerComponent,
    SalesManagerComponent,
    SalesListComponent,
    ModalReceiptComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
