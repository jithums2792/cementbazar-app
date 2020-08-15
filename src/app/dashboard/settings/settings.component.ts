import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public user

  constructor(private router: NavController,
              private userservice: UserService) { }

  ngOnInit() {
    this.getuser()
  }

  getuser() {
    this.userservice.getUserbyid(localStorage.getItem('userid')).subscribe(data => {
      console.log(data)
      this.user = data.data
    })
  }

  async logout() {
    localStorage.removeItem('userid')
    this.router.navigateBack(['/dashboard'])
  }

}
