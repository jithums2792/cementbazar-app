import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductcardComponent } from './productcard/productcard.component';
import { ProductComponent } from '../dashboard/product/product.component';



@NgModule({
  declarations: [FooterComponent,
                  ProductComponent,
                  HeaderComponent,
                  ProductcardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [FooterComponent,
            HeaderComponent,
            ProductComponent,
            ProductcardComponent]
})
export class SharedModule { }
