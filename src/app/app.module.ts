import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";

import { AppComponent } from './app.component';
import { MainLayoutComponent } from '@shared';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import {AdminModule} from "./admin/admin.module";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./shared/auth.service";
import {environment} from "../environments/environments";

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
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
