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
