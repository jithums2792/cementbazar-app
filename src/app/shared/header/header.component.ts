import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public categoryList:Array<any>

  constructor(private categoryservice: CategoryService) { }

  ngOnInit() {
    this.getAllCategory()
  }

  getAllCategory() {
    this.categoryservice.getAllCategory().subscribe(data => this.categoryList = data.data)
  }

}
