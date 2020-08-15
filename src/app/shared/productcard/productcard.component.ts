import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductComponent } from '../../dashboard/product/product.component'
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.scss'],
})
export class ProductcardComponent implements OnInit {
  @Input() data
  flag = false
  public wishlist = []

  constructor(private modalservice: ModalController,
              private toastservice: ToastController,
              private wishservice: WishlistService) { }

  ngOnInit() {
    this.getwishlist()
  }

  async getwishlist() {
    if(localStorage.getItem('userid')) {
      this.wishservice.getwishlistByid(localStorage.getItem('userid')).subscribe(data => {
        this.wishlist = data.data[0].items
        this.check()
      })
    }
  }

  async openproduct() {
    const modal = await this.modalservice.create({
      component: ProductComponent,
      componentProps: {data: this.data}
    })
    return await modal.present()
  }

  async addtowishlist() {
    if(localStorage.getItem('userid')) {
      this.wishlist.push(this.data._id)
      this.wishservice.updatewishlist(localStorage.getItem('userid'),{
        wishlist: {
          items: this.wishlist
        }
      }).subscribe(async data => {
        if(data.status === 'success') {
          const toast = await this.toastservice.create({
            message: 'Added to wishlist',
            duration: 1000,
            mode: 'ios',
            position: 'top'
          })
          await toast.present()
          this.wishservice.updatewislistcount(this.wishlist.length)
          this.check()
        }
      })
    } else {
      const toast = await this.toastservice.create({
        message: 'Login to add as wish Item',
        duration: 2000,
        mode: 'ios',
        position: 'top'
      })
      await toast.present()
    }
  }
  async removefromwishlist() {
    const index = await this.wishlist.indexOf(this.data.id)
    this.wishlist.splice(index, 1)
    this.wishservice.updatewishlist(localStorage.getItem('userid'),{
      wishlist: {
        items: this.wishlist
      }
    }).subscribe(async data => {
      if(data.status === 'success') {
        const toast = await this.toastservice.create({
          message: 'removed from wishlist',
          duration: 1000,
          mode: 'ios',
          position: 'top'
        })
        await toast.present()
        this.wishservice.updatewislistcount(this.wishlist.length)
        this.flag = false
        this.check()
      }
    }) 
  }

  check() {
    this.wishlist.map(item => {
      if(item === this.data._id) {
        this.flag = true
      } else {
        this.flag = false
      }
    })
  }

}
