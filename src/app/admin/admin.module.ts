import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuillEditorComponent} from "ngx-quill";

import {AdminLayoutComponent} from "@shared-admin";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AddPageComponent} from "./add-page/add-page.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import {authGuard} from "../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
      { path: 'login',component: LoginPageComponent },
      { path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
      },
      { path: 'add',component: AddPageComponent },
      { path: 'orders',component: OrdersPageComponent },
      { path: 'product/:id/edit',component: EditPageComponent },
    ]
  }
]

@NgModule({
  declarations: [
    AdminLayoutComponent,
    OrdersPageComponent,
    DashboardComponent,
    LoginPageComponent,
    EditPageComponent,
    AddPageComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    QuillEditorComponent,
  ]
})
export class AdminModule { }
