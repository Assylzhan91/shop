import {GET_ALL_LIST} from "@tokens";
import {inject, Provider} from "@angular/core";
import {map, Observable} from "rxjs";
import { ResponseAllListInterface} from "@models";
import { HttpClient } from "@angular/common/http";
import { dev } from "@environments";


export const GET_ALL_LIST_PROVIDERS: Provider[] = [
  {
    provide: GET_ALL_LIST,
    useFactory: <T, R extends ResponseAllListInterface>(link: string)=>  getAllListFactory<T, R>(link),
    deps: ['orders']
  },
];

 function getAllListFactory<T, R extends ResponseAllListInterface>(link: string): Observable<T[]>{
  const http = inject(HttpClient)
  return http.get<Record<string, R>>(`${dev.environment.firebase.fbDb}/${link}.json`)
    .pipe(
      map((res: Record<string, R>)=> {
        return Object.keys(res).map( key => ({
          ...res[key],
          id: key,
          date: new Date(res[key].date)
        }) as T)
    }))
}
