import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductComponent } from '../../dashboard/product/product.component'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.scss'],
})
export class ProductcardComponent implements OnInit {
  @Input() data
  flag = false
  user

  constructor(private modalservice: ModalController,
              private userservice: UserService) { }

  ngOnInit() {
    this.getuser()
  }

  async getuser() {
    this.user = await this.userservice.getUser()
    this.check()
  }

  async openproduct() {
    const modal = await this.modalservice.create({
      component: ProductComponent,
      componentProps: {data: this.data}
    })
    return await modal.present()
  }

  async addtowishlist() {
    this.user.wishlist.push(this.data.id)
    this.userservice.updatewislistcount(this.user.wishlist.length)
    this.check()
  }
  async removefromwishlist() {
    const index = await this.user.wishlist.indexOf(this.data.id)
    this.user.wishlist.splice(index, 1)
    this.userservice.updatewislistcount(this.user.wishlist.length)
    this.flag = false
  }

  check() {
    this.user.wishlist.map(item => {
      if(item === this.data.id) {
        this.flag = true
      } else {
        this.flag = false
      }
    })
  }

}
