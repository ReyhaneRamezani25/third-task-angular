import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpClientBase {
  private _http = inject(HttpClient);

  get<T>(url:string){
    return this._http.get<T>(url);
  }

 post<T>(url: string, body: any) {
    return this._http.post<T>(url, body);
  }
  
}
