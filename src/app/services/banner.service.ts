import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  public api = environment.api

  constructor(private http: HttpClient) { }

  getbanner(): Observable<any> {
    return this.http.get(this.api+`banner/all`);
  }
}
