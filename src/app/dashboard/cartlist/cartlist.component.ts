import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.scss'],
})
export class CartlistComponent implements OnInit {
  public cartlist = []
  public products = []
  public totalamount = 0

  constructor(private cartservice: CartService,
              private toastservice: ToastController,
              private productservice: ProductService) { }

  ngOnInit() {
    this.getcartlist()
  }

  getcartlist() {
    this.products = []
    this.totalamount = 0
    this.cartservice.getcartByid(localStorage.getItem('userid')).subscribe(data => {
      this.cartlist = data.data[0].items
      this.cartservice.updatecartcount(data.data[0].items.length)
      data.data[0].items.map(item => this.getproduct(item.item_id,item.item_qty))
    })
  }

  getproduct(id,qty) {
    this.productservice.getproductbyid(id).subscribe(data => {
      Object.assign(data.data,{qty: qty})
      this.totalamount += (data.data.price - data.data.discountPrice)*qty
      this.products.push(data.data)
    })
  }

  async add(i, pid) {
    this.products[i].qty += 1
    const index = this.cartlist.findIndex(item => item.item_id === pid)
    this.cartlist[index].item_qty += 1
    this.cartservice.addtocart(localStorage.getItem('userid'),{cart: {items: this.cartlist}})
    .subscribe(data => {
      console.log(data)
      if (data.status === 'success') {
        this.getcartlist()
      }
    })
  }

  async remove(i,pid) {
    if (this.products[i].qty <= 1) {
      const toast = await this.toastservice.create({
        message: 'Cant be set to zero',
        duration: 1000,
        mode: 'ios',
        position: 'top'
      })
      await toast.present()
    } else {
      this.products[i].qty -= 1
      const index = this.cartlist.findIndex(item => item.item_id === pid)
      this.cartlist[index].item_qty -= 1
      this.cartservice.addtocart(localStorage.getItem('userid'),{cart: {items: this.cartlist}})
      .subscribe(data => {
        console.log(data)
        if (data.status === 'success') {
          this.getcartlist()
        }
      })
    }
  }

  async delete(i, pid) {
    const index = this.cartlist.findIndex(item => item.item_id === pid)
    this.cartlist.splice(index, 1)
    this.cartservice.addtocart(localStorage.getItem('userid'),{cart: {items: this.cartlist}})
      .subscribe(data => {
        console.log(data)
        if (data.status === 'success') {
          this.getcartlist()
        }
      })
  }

}
