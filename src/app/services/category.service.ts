import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public categoryList = [
    {name: 'fruits'},
    {name: 'vegitable'}
  ]
  public api = environment.api

  constructor(private http: HttpClient) { }

  getAllCategory():Observable<any> {
    return this.http.get(this.api+'category/all');
  }
}
