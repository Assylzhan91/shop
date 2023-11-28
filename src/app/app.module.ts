import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from '@shared';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import {AdminModule} from "./admin/admin.module";

@NgModule({
  declarations: [
    ProductPageComponent,
    MainLayoutComponent,
    MainPageComponent,
    CartPageComponent,
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
