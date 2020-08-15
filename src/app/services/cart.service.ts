import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public api = environment.api
  public cartcount = new Subject<number>()

  constructor(private http: HttpClient) { }

  getcartByid(id): Observable<any> {
    return this.http.get(this.api+`cart/all?filter[userid]=${id}`);
  }

  craetecart(cart): Observable<any> {
    return this.http.post(this.api+'cart/create', cart);
  }

  getcartcount():Observable<number> {
    return this.cartcount.asObservable()
  }

  addtocart(id,cart):Observable<any> {
    return this.http.put(this.api+'cart/update/'+id,cart)
  }

  updatecartcount(count) {
    this.cartcount.next(count)
  }
}
