import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable()
export abstract class CommonService {
   public http = inject(HttpClient)
   public router = inject(Router)
}
