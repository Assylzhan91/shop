import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import { QuillModule } from 'ngx-quill'

import {ProductPageComponent} from "./product-page/product-page.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {CartPageComponent} from "./cart-page/cart-page.component";
import {MainLayoutComponent, OrderService} from "@shared";
import {ORDER_SERVICE} from "@tokens";


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', redirectTo: '/', pathMatch: "full"},
      {path: '', component: MainPageComponent},
      {path: 'product/:id', component: ProductPageComponent},
      {
        path: 'cart',
        component: CartPageComponent,
        providers: [
          {
            provide: ORDER_SERVICE,
            useClass: OrderService
          }
        ]
      },
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
