import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { QuillModule } from 'ngx-quill'

import {MainPageComponent} from "./main-page/main-page.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {CartPageComponent} from "./cart-page/cart-page.component";
import {MainLayoutComponent} from "@shared";


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', redirectTo: '/', pathMatch: "full"},
      {path: '', component: MainPageComponent},
      {path: 'product/:id', component: ProductPageComponent},
      {path: 'cart', component: CartPageComponent},
    ]
  },
  { path: 'admin', loadChildren: ()=> import('./admin/admin.module').then(m => m.AdminModule) }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
    QuillModule.forRoot({
      debug: "error",
      placeholder: '',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
