import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user = {
    name: 'jithu',
    cartlist: [],
    wishlist: []
  }
  public api = environment.api
  public wishlist = new Subject<number>()

  constructor(private http: HttpClient) { }

  getWishlistcount():Observable<number> {
    return this.wishlist.asObservable()
  }

  updatewislistcount(count) {
    this.wishlist.next(count)
  }

  getUser(): Observable<any> {
    return this.http.get(this.api)
  }


  register(data):Observable<any> {
    return this.http.post(this.api+`users/register`,data);
  }
  login(data):Observable<any> {
    return this.http.post(this.api+`users/login`,data);
  }
}
