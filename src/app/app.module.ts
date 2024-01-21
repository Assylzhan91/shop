import {HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireModule} from "@angular/fire/compat";
import {ReactiveFormsModule} from "@angular/forms";
import {QuillViewHTMLComponent} from "ngx-quill";
import { NgModule } from '@angular/core';
import {BehaviorSubject} from "rxjs";

import {AUTH_SERVICE, CART_PRODUCTS, ORDER_SERVICE, PRODUCT_SERVICE} from "@tokens";
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import {ProductComponent} from "./product/product.component";
import {environment} from "../environments/environments";
import {AdminModule} from "./admin/admin.module";
import { AppComponent } from './app.component';
import {ProductResponseWithId} from "@models";
import {
  MainLayoutComponent,
  AuthService,
  ProductService,
  SortingProductsPipe,
  AuthInterceptor,
  OrderService
} from '@shared';



@NgModule({
  declarations: [
    ProductPageComponent,
    MainLayoutComponent,
    MainPageComponent,
    CartPageComponent,
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule,
    HttpClientModule,
    ProductComponent,
    BrowserModule,
    AdminModule,
    QuillViewHTMLComponent,
    SortingProductsPipe,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService
    },
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductService
    },
    {
      provide: CART_PRODUCTS,
      useValue: new BehaviorSubject<ProductResponseWithId[]>([])
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: ORDER_SERVICE,
      useClass: OrderService
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
