import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartlistComponent } from './cartlist/cartlist.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginGuard } from '../Auth/login.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'cartlist',
    component: CartlistComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
