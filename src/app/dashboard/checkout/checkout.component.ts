import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  constructor(private modalservice: ModalController) { }

  ngOnInit() {}

  async close() {
    this.modalservice.dismiss({
      'dismiss': true
    })
  }

}
