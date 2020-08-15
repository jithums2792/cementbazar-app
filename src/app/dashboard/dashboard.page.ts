import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryviewComponent } from './categoryview/categoryview.component'
import { CategoryService } from '../services/category.service';
import { WishlistService } from '../services/wishlist.service';
import { BannerService } from '../services/banner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public categoryList:Array<any>
  public loader = true
  public bannerList = []

  constructor(private modalservice: ModalController,
              private bannerservice: BannerService,
              private categoryservice: CategoryService,
              private wishservice: WishlistService) { }

  ngOnInit() {
    this.getallcategory()
    this.getwishlist()
    this.getallbanner()
  }

  async getwishlist() {
    if (localStorage.getItem('userid')) {
      this.wishservice.getwishlistByid(localStorage.getItem('userid')).subscribe(data => {
        if (data.status === 'success') {
          this.wishservice.updatewislistcount(data.data[0].items.length)
        }
      })
    }
  }

  getallbanner() {
    console.log('jjjgggjj')
    this.bannerservice.getbanner().subscribe(data => this.bannerList = data.data)
  }

  async getallcategory() {
    this.loader = true
    this.categoryservice.getAllCategory().subscribe(data=> {
      this.categoryList = data.data
      this.loader = false
    })
  }

  async opencategory(data) {
    const modal = await this.modalservice.create({
      component: CategoryviewComponent,
      componentProps: {data: data}
    }) 
    return await modal.present()
  }

}
