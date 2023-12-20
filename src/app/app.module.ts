import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {HttpClientModule} from "@angular/common/http";

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import {AdminModule} from "./admin/admin.module";
import {environment} from "../environments/environments";
import {MainLayoutComponent, AuthService, ProductService } from '@shared';
import {AUTH_SERVICE, PRODUCT_SERVICE} from "@tokens";

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
    BrowserModule,
    AdminModule
  ],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductService,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
