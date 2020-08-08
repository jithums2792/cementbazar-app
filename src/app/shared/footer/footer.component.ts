import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public wishcount = 0

  constructor(private modalservice: ModalController,
              private userservice: UserService,
              private router: NavController) { 
                 userservice.getWishlistcount().subscribe(data => this.wishcount = data)
              }

  ngOnInit() {}

  async home() {
    try {
      this.modalservice.dismiss({
        'dismiss': true
      }).catch(err => this.router.navigateBack(['/dashboard']))
    } catch (error) {
      this.router.navigateBack(['/dashboard'])
    }
  }

  async wishlist() {
    this.router.navigateForward(['/dashboard/wishlist'])
  }

}
