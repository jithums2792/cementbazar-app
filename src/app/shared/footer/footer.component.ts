import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { WishlistService } from 'src/app/services/wishlist.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public wishcount = 0
  public cartcount = 0

  constructor(private modalservice: ModalController,
              private wishservice: WishlistService,
              private cartservice: CartService,
              private router: NavController) { 
                wishservice.getWishlistcount().subscribe(data => this.wishcount = data)
                cartservice.getcartcount().subscribe(data => this.cartcount = data)
              }

  ngOnInit() {
   this.getwishlist() 
   this.getcartlist()
  }
  
  getwishlist() {
    if(localStorage.getItem('userid')) {
      this.wishservice.getwishlistByid(localStorage.getItem('userid')).subscribe(data => {
        this.wishservice.updatewislistcount(data.data[0].items.length)
      })
    }
  }

  getcartlist() {
    if(localStorage.getItem('userid')) {
      this.cartservice.getcartByid(localStorage.getItem('userid')).subscribe(data => {
        this.cartservice.updatecartcount(data.data[0].items.length)
      })
    }
  }

  async home() {
    try {
      this.modalservice.dismiss({
        'dismiss': true
      }).catch(err => this.router.navigateBack(['/dashboard']))
    } catch (error) {
      this.router.navigateBack(['/dashboard'])
    }
  }

  async wishlist() {
    try {
      this.modalservice.dismiss({
        'dismiss': true
      }
      ).catch(err => this.router.navigateForward(['/dashboard/wishlist']))
      this.router.navigateForward(['/dashboard/wishlist'])
    } catch (error) {
      this.router.navigateForward(['/dashboard/wishlist'])
    }

  }
  async cartlist() {
    try {
      this.modalservice.dismiss({
        'dismiss': true
      }).catch(err => this.router.navigateForward(['/dashboard/cartlist']))
      this.router.navigateForward(['/dashboard/cartlist'])
    } catch (error) {
      this.router.navigateForward(['/dashboard/cartlist'])
    }
  }
  async settings() {
    try {
      this.modalservice.dismiss({
        'dismiss': true
      }).catch(err => this.router.navigateForward(['/dashboard/settings']))
      this.router.navigateForward(['/dashboard/settings'])
    } catch (error) {
      this.router.navigateForward(['/dashboard/settings'])
    }
  }

}
