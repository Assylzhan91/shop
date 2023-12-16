import {FormControl} from "@angular/forms";

export interface AddProductInterface {
  type: FormControl;
  title: FormControl;
  photo: FormControl;
  info: FormControl;
  price: FormControl;
}
