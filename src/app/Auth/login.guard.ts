import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private toastservice: ToastController, private router: NavController){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('userid')) {
      return true
    } else {
      this.alert()
      return false
    }
  }
  async alert() {
    const toast =  await this.toastservice.create({
      message: 'You are not logged in',
      duration: 2000,
      mode: 'ios',
      position: 'top'
    })
    await toast.present()
    this.router.navigateBack(['/login/signin'])
  }
  
}
