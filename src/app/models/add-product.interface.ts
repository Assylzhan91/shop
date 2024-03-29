import {FormControl} from "@angular/forms";

export interface AddProductInterface<T> {
  type: T;
  title: T;
  photo: T;
  info: T;
  price: T;
}

export interface AddProductFormInterface {
  type: string;
  title: string;
  photo: string;
  info: string;
  price: string;
  date: Date;
}

export interface ResponseAddProductInterface {
  name: string
}
export interface ResponseProductInterface extends AddProductFormInterface{
  id: string
  date: Date;
}

export interface ProductResponseWithId extends AddProductFormInterface {
  id: string;
}


export enum PaymentMethod {
  Cash = 'Cash',
  Cart = 'Cart'
}
export interface Order<T> {
  address: string;
  date: Date;
  name: string;
  orders: ProductResponseWithId[];
  payment: T;
  phone: string;
  price: string;
}

export type OrderPayment = Order<PaymentMethod>

export type ResponseAllListInterface = {
  id: string; date: Date
}

export type OrderPaymentWithId = OrderPayment & ResponseAllListInterface

export interface CartProductFormValues<T> {
  name: FormControl<string | undefined>;
  phone: FormControl<string | undefined>;
  address: FormControl<string | undefined>;
  payment: FormControl<T> ;
}
