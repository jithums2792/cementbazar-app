import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  public api = environment.api
  public wishlistcount = new Subject<number>()

  constructor(private http: HttpClient) { }

  getwishlistByid(id): Observable<any> {
    return this.http.get(this.api+`wishlist/all?filter[userid]=${id}`);
  }

  createwishlist(wishlist): Observable<any> {
    return this.http.post(this.api+'wishlist/create', wishlist);
  }

  updatewishlist(id,wishlist):Observable<any> {
    return this.http.put(this.api+'wishlist/update/'+id,wishlist)
  }

  getWishlistcount():Observable<number> {
    return this.wishlistcount.asObservable()
  }

  updatewislistcount(count) {
    this.wishlistcount.next(count)
  }
}
