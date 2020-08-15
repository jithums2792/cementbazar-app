import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-categoryview',
  templateUrl: './categoryview.component.html',
  styleUrls: ['./categoryview.component.scss'],
})
export class CategoryviewComponent implements OnInit {
  @Input() data
  public loader = true
  public filterFlag = false
  products = []
  query = {
    category: '',
    page: 1,
    limit: 4
  }

  filter = {
    manufatures: [],
    category: '',
    price: 100,
    limit: 4,
    skip: 0
  }

  constructor(private modalservice: ModalController,
              private toastservice: ToastController,
              private productservice: ProductService) { }

  ngOnInit() {
    this.query.category = this.data.name
    this.filter.category = this.data.name
    this.getProducts()
  }

  async getProducts() {
    this.loader = true
    this.productservice.getallProductByquery(this.query).subscribe(data => {
      this.products = data.data
      this.loader = false
    })
  }

  async close() {
    this.modalservice.dismiss({
      'dismiss': true
    })
  }

  async applyfilter() {
    this.filterFlag = true
    this.productservice.getallProductByFilter(this.filter).subscribe(async data => {
      if (data.status === 'success' && data.data.length > 0) {
        this.products = data.data
      } else {
        const toast = await this.toastservice.create({
          message: 'No data',
          duration: 1000,
          mode: 'ios',
          position: 'top'
        })
        await toast.present()
      }
    })
  }

  async loadmore() {
    if(!this.filterFlag) {
      this.query.page += 1
      this.productservice.getallProductByquery(this.query).subscribe(data => {
        if (data.status === 'success' && data.data.length > 0) {
          data.data.map(item => this.products.push(item))
        }
      })
    } else {
      this.filter.skip += 4
      this.productservice.getallProductByFilter(this.filter).subscribe(data => {
        if (data.status === 'success' && data.data.length > 0) {
          data.data.map(item => this.products.push(item))
        }
      })
    }
  }
  

}
