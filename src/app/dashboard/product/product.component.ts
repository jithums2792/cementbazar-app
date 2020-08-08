import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() data
  public gallery = []

  constructor(private modalservice: ModalController) { }

  ngOnInit() {
    this.gallery = this.data.gallery
  }

  async close() {
    this.modalservice.dismiss({
      'dismiss': true
    })
  }

  addtocart() {
    
  }

}
