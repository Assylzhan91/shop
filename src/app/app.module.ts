import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import {MainLayoutComponent, AuthService, ProductService, SortingProductsPipe, AuthInterceptor} from '@shared';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import {AdminModule} from "./admin/admin.module";
import {environment} from "../environments/environments";
import {AUTH_SERVICE, PRODUCT_SERVICE} from "@tokens";
import {ProductComponent} from "./product/product.component";
import {QuillViewHTMLComponent} from "ngx-quill";

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
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
