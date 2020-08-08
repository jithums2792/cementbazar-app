import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryviewComponent } from './categoryview/categoryview.component'
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public categoryList:Array<any>

  constructor(private modalservice: ModalController,
              private categoryservice: CategoryService) { }

  ngOnInit() {
    this.getallcategory()
  }

  async getallcategory() {
    this.categoryservice.getAllCategory().subscribe(data=> this.categoryList = data.data)
  }

  async opencategory(data) {
    const modal = await this.modalservice.create({
      component: CategoryviewComponent,
      componentProps: {data: data}
    }) 
    return await modal.present()
  }

}
