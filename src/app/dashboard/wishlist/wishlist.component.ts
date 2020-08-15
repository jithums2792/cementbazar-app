import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {
  public productList = []
  public wishlist = []

  constructor(private wishservice: WishlistService,
              private toastservice: ToastController,
              private productservice: ProductService) { }

  ngOnInit() {
    this.getWishlist()
  }

  getWishlist() {
    this.productList = []
    this.wishservice.getwishlistByid(localStorage.getItem('userid')).subscribe(data => {
      if(data.status === 'success' && data.data[0].items.length > 0) {
        this.wishlist = data.data[0].items
        data.data[0].items.map(item => this.getproducts(item))
      }
    })
  }

  async delete(id) {
    const index = this.wishlist.indexOf(id)
    this.wishlist.splice(index, 1)
    this.wishservice.updatewishlist(localStorage.getItem('userid'),{
      wishlist: {
        items: this.wishlist
      }
    }).subscribe(async data => {
      if(data.status === 'success') {
        this.getWishlist()
        const toast = await this.toastservice.create({
          message: 'removed from wishlist',
          duration: 1000,
          mode: 'ios',
          position: 'top'
        })
        await toast.present()
        this.wishservice.updatewislistcount(this.wishlist.length)
      }
    })
  }

  getproducts(id) {
    this.productservice.getproductbyid(id).subscribe(data => {
      this.productList.push(data.data)
    })
  }

}
