import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public api = environment.api
  public productlList = []

  constructor(private http: HttpClient) { }

  getallProducts(): Observable<any> {
    return this.http.get(this.api+'product/all');
  }
  getallProductByquery(query): Observable<any> {
    return this.http.get(this.api+`product/all?filter[category]=${query.category}`);
  }
}
