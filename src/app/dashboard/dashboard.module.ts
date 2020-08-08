import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module'

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { CategoryviewComponent } from './categoryview/categoryview.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProductcardComponent } from '../shared/productcard/productcard.component';
import { CartlistComponent } from './cartlist/cartlist.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage,
                 CategoryviewComponent,
                 CategoryviewComponent,
                 WishlistComponent,
                 CartlistComponent,
                 SettingsComponent]
})
export class DashboardPageModule {}
