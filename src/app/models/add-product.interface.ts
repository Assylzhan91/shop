export interface AddProductInterface<T> {
  type: T;
  title: T;
  photo: T;
  info: T;
  price: T;
}

export interface AddProductFormInterface {
  type: string | undefined;
  title: string | undefined;
  photo: string | undefined;
  info: string | undefined;
  price: string | undefined;
  dataAdd: Date;
}

export interface ResponseAddProductInterface {
  name: string
}
export interface ResponseProductInterface extends AddProductFormInterface{
  id: string
  date: Date;
}
