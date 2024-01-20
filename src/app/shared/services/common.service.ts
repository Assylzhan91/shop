import {inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

import {dev} from "@environments";

export abstract class CommonService {
   public env = dev
   public http = inject(HttpClient)
   public router = inject(Router)
}
