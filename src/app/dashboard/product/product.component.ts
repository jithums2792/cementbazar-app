import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, NavController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() data
  public gallery = []
  cartlist = []
  public product = {
    item_id: '',
    item_qty: 1
  }

  constructor(private modalservice: ModalController,
              private router: NavController,
              private cartservice: CartService,
              private toastservice: ToastController) { }

  ngOnInit() {
    this.gallery = this.data.gallery
    this.product.item_id = this.data._id
    this.getcartlist()
  }

  getcartlist() {
    if (localStorage.getItem('userid')) {
        this.cartservice.getcartByid(localStorage.getItem('userid')).subscribe(data => {
        this.cartlist = data.data[0].items
        this.cartservice.updatecartcount(this.cartlist.length)
      })
    }
  }

  async close() {
    this.modalservice.dismiss({
      'dismiss': true
    })
  }

  async addtocart() {
   if(localStorage.getItem('userid')) {
   if(this.cartlist.some(item => item.item_id === this.product.item_id)) {
     const index = await this.cartlist.findIndex(item => item.item_id === this.product.item_id)
     console.log('exist', index)
     this.cartlist[index].item_qty += this.product.item_qty
     this.cartservice.addtocart(localStorage.getItem('userid'),{cart: {items: this.cartlist}})
     .subscribe(async data => {
       console.log(data)
       if (data.status === 'success') {
          const toast = await this.toastservice.create({
          message: 'Added to cart list',
          mode: 'ios',
          position: 'top',
          duration: 1000
          })
          await toast.present()
       }
     })
   } else {
     this.cartlist.push(this.product)
     this.cartservice.addtocart(localStorage.getItem('userid'),{cart: {items: this.cartlist}})
     .subscribe(async data => {
       console.log(data)
       if (data.status === 'success') {
          const toast = await this.toastservice.create({
          message: 'Added to cart list',
          mode: 'ios',
          position: 'top',
          duration: 1000
          })
          await toast.present()
       }
     })
   }
   } else {
    const toast = await this.toastservice.create({
      message: 'Login to add to cart',
      duration: 2000,
      mode: 'ios',
      position: 'top'
    })
    await toast.present()
   }
  }

  async add() {
    this.product.item_qty += 1
  }
  async remove() {
    if(this.product.item_qty <= 1){
      const toast = await this.toastservice.create({
        message: 'cant set to be zero',
        duration: 1000,
        mode: 'ios',
        position: 'top'
      })
      await toast.present()
    } else {
      this.product.item_qty -= 1
    }
  }

}
