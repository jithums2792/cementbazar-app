import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-categoryview',
  templateUrl: './categoryview.component.html',
  styleUrls: ['./categoryview.component.scss'],
})
export class CategoryviewComponent implements OnInit {
  @Input() data
  products = []
  query = {
    category: ''
  }

  constructor(private modalservice: ModalController,
              private productservice: ProductService) { }

  ngOnInit() {
    this.query.category = this.data.name
    this.getProducts()
  }

  async getProducts() {
    this.productservice.getallProductByquery(this.query).subscribe(data => console.log(data))
  }

  async close() {
    this.modalservice.dismiss({
      'dismiss': true
    })
  }
  

}
