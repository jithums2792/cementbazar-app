import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartlistComponent } from './cartlist/cartlist.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'wishlist',
    component: WishlistComponent
  },
  {
    path: 'cartlist',
    component: CartlistComponent
  },
  {
    path: 'settings',
    component: WishlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
