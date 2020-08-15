import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public registerForm = new FormGroup({
    fname: new FormControl('',Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phno: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
    scope: new FormControl('user')
  })
  public loader

  constructor(private userservice: UserService,
              private loaderservice: LoadingController,
              private router: NavController,
              private toastservice: ToastController,
              private wishlistservice: WishlistService,
              private cartservice: CartService) { }

  async ngOnInit() {
    this.loader = await this.loaderservice.create({
      message: 'Please wait',
      mode: 'ios'
    })
  }

  async register() {
    if (this.registerForm.valid) {
      await this.loader.present()
      this.userservice.register(this.registerForm.value).subscribe(data => {
        if(data.status === 'success') {
          localStorage.setItem('userid', data.data._id)
          this.createwishlist()
          this.router.navigateForward('/dashboard')
        }
      }, async err => {
        this.loader.dismiss()
        this.loader = await this.loaderservice.create({
          message: 'Please wait',
          mode: 'ios'
        })
        const toast = await this.toastservice.create({
          message: err.error[0].message,
          duration: 2000,
          mode: 'ios',
          position: 'top'
        })
        await toast.present()
      })
    } else {
      const toast = await this.toastservice.create({
        message: 'some fields are missing..!!',
        duration: 2000
      })
      await toast.present()
    }
  }

  async createwishlist() {
    this.wishlistservice.createwishlist({
      wishlist: {
        userid: localStorage.getItem('userid'),
        items: [],
        date: new Date()
      }
    }).subscribe(async data => {
      if(data.status === "success") {
        const toast = await this.toastservice.create({
          message: 'wish basket created',
          duration: 2000,
          mode: 'ios',
          position: 'top'
        })
        await toast.present()
        this.createcaet()
      }
    })
  }

  async createcaet() {
    this.cartservice.craetecart({
      cart: {
        userid: localStorage.getItem('userid'),
        items: [],
        date: new Date()
      }
    }).subscribe(async data => {
      if(data.status === "success") {
        const toast = await this.toastservice.create({
          message: 'cart basket created',
          duration: 2000,
          mode: 'ios',
          position: 'top'
        })
        await toast.present()
        this.loader.dismiss()
      }
      this.loader.dismiss()
    })
  }

}
